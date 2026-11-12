import { useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ImagePlus, Link2, Loader2, Plus, Trash2 } from 'lucide-react';
import { uploadImage } from '../api/client.js';

/**
 * Renders a form from a list of field definitions:
 *   { name, label, type, help, required, options, rows, fields, itemLabel, addLabel }
 *
 * Types: text · number · date · textarea · checkbox · select · image ·
 *        images · list · paragraphs · repeater
 */
export default function FormBuilder({ fields, value, onChange }) {
  const set = (name, fieldValue) => onChange({ ...value, [name]: fieldValue });

  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <Field key={field.name} field={field} value={value?.[field.name]} onChange={(v) => set(field.name, v)} />
      ))}
    </div>
  );
}

function Label({ field }) {
  return (
    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-600">
      {field.label}
      {field.required && <span className="text-red-600"> *</span>}
    </span>
  );
}

function Field({ field, value, onChange }) {
  if (field.type === 'checkbox') {
    return (
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#8a6718]"
        />
        <span>
          <span className="text-sm font-semibold text-neutral-800">{field.label}</span>
          {field.help && <span className="block text-xs text-neutral-500">{field.help}</span>}
        </span>
      </label>
    );
  }

  const control = (() => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            className="control resize-y"
            rows={field.rows || 4}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case 'select':
        return (
          <select className="control" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
            {!field.required && <option value="">—</option>}
            {field.options.map((option) => {
              const o = typeof option === 'object' ? option : { value: option, label: option };
              return (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              );
            })}
          </select>
        );
      case 'image':
        return <ImageInput value={value} onChange={onChange} />;
      case 'images':
        return <ImagesInput value={value} onChange={onChange} />;
      case 'list':
        return <ListInput value={value} onChange={onChange} addLabel={field.addLabel} />;
      case 'paragraphs':
        return <ListInput value={value} onChange={onChange} addLabel={field.addLabel || 'Add paragraph'} multiline />;
      case 'repeater':
        return <Repeater field={field} value={value} onChange={onChange} />;
      case 'number':
        return (
          <input
            type="number"
            step="any"
            className="control"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            className="control"
            value={value ? String(value).slice(0, 10) : ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      default:
        return <input type="text" className="control" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />;
    }
  })();

  // Compound inputs contain several controls, so they are grouped rather than wrapped in one <label>.
  const isCompound = ['image', 'images', 'list', 'paragraphs', 'repeater'].includes(field.type);
  const Wrapper = isCompound ? 'div' : 'label';

  return (
    <Wrapper className="block">
      <Label field={field} />
      {control}
      {field.help && <span className="mt-1.5 block text-xs text-neutral-500">{field.help}</span>}
    </Wrapper>
  );
}

/* ----------------------------------------------------------------- images */

function useUploader(onUploaded) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const upload = async (files) => {
    setBusy(true);
    setError('');
    try {
      for (const file of files) onUploaded(await uploadImage(file));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  return { busy, error, upload };
}

function UploadButton({ onFiles, busy, multiple = false, label }) {
  const input = useRef(null);
  return (
    <>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        multiple={multiple}
        hidden
        onChange={(e) => {
          if (e.target.files.length) onFiles([...e.target.files]);
          e.target.value = '';
        }}
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => input.current.click()}
        className="inline-flex items-center gap-2 rounded-lg border border-black/15 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 transition hover:bg-neutral-50 disabled:opacity-60"
      >
        {busy ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
        {busy ? 'Uploading…' : label}
      </button>
    </>
  );
}

function ImageInput({ value, onChange }) {
  const { busy, error, upload } = useUploader(onChange);

  return (
    <div className="rounded-lg border border-black/10 bg-white p-3">
      <div className="flex gap-3">
        <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xs text-neutral-400">
          {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : 'No image'}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <UploadButton onFiles={(files) => upload(files.slice(0, 1))} busy={busy} label={value ? 'Replace photo' : 'Upload photo'} />
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
              >
                <Trash2 size={13} /> Remove
              </button>
            )}
          </div>
          <label className="flex items-center gap-2 text-neutral-400">
            <Link2 size={14} className="shrink-0" />
            <input
              type="text"
              className="control py-1.5! text-xs!"
              placeholder="…or paste an image address"
              value={value ?? ''}
              onChange={(e) => onChange(e.target.value)}
            />
          </label>
        </div>
      </div>
      {error && <p className="mt-2 text-xs font-semibold text-red-700">{error}</p>}
    </div>
  );
}

function ImagesInput({ value, onChange }) {
  const images = Array.isArray(value) ? value : [];
  // Uploads finish one by one, so each result is appended to the latest list.
  const latest = useRef(images);
  latest.current = images;
  const add = (url) => {
    latest.current = [...latest.current, url];
    onChange(latest.current);
  };
  const { busy, error, upload } = useUploader(add);
  const [pasted, setPasted] = useState('');

  const move = (index, step) => {
    const next = [...images];
    const target = index + step;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="rounded-lg border border-black/10 bg-white p-3">
      {images.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((src, index) => (
            <div key={`${src}-${index}`} className="group relative overflow-hidden rounded-md bg-neutral-100">
              <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
              <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {index + 1}
              </span>
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/55 p-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
                <span className="flex">
                  <IconButton label="Move earlier" onClick={() => move(index, -1)} disabled={index === 0}>
                    <ArrowLeft size={13} />
                  </IconButton>
                  <IconButton label="Move later" onClick={() => move(index, 1)} disabled={index === images.length - 1}>
                    <ArrowRight size={13} />
                  </IconButton>
                </span>
                <IconButton label="Remove photo" onClick={() => onChange(images.filter((_, i) => i !== index))}>
                  <Trash2 size={13} />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <UploadButton onFiles={upload} busy={busy} multiple label="Upload photos" />
        <div className="flex min-w-48 flex-1 items-center gap-2">
          <input
            type="text"
            className="control py-1.5! text-xs!"
            placeholder="…or paste an image address"
            value={pasted}
            onChange={(e) => setPasted(e.target.value)}
          />
          <button
            type="button"
            disabled={!pasted.trim()}
            onClick={() => {
              add(pasted.trim());
              setPasted('');
            }}
            className="rounded-lg border border-black/15 px-3 py-1.5 text-xs font-semibold disabled:opacity-40"
          >
            Add
          </button>
        </div>
      </div>
      {error && <p className="mt-2 text-xs font-semibold text-red-700">{error}</p>}
    </div>
  );
}

function IconButton({ label, children, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="rounded p-1.5 text-white hover:bg-white/25 disabled:opacity-30"
      {...rest}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ lists */

function ListInput({ value, onChange, addLabel = 'Add item', multiline = false }) {
  const items = Array.isArray(value) ? value : [];
  const update = (index, text) => onChange(items.map((item, i) => (i === index ? text : item)));

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          {multiline ? (
            <textarea className="control resize-y" rows={4} value={item} onChange={(e) => update(index, e.target.value)} />
          ) : (
            <input type="text" className="control" value={item} onChange={(e) => update(index, e.target.value)} />
          )}
          <button
            type="button"
            aria-label="Remove"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
            className="mt-1 rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-black/20 px-3 py-2 text-xs font-semibold text-neutral-600 hover:border-brand-500 hover:text-brand-600"
      >
        <Plus size={13} /> {addLabel}
      </button>
    </div>
  );
}

/** A list of small sub-forms, e.g. hero slides, team members or process steps. */
export function Repeater({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const blank = Object.fromEntries(field.fields.map((f) => [f.name, f.type === 'number' ? 0 : '']));

  const move = (index, step) => {
    const next = [...items];
    const target = index + step;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="rounded-lg border border-black/10 bg-white">
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-2">
            <p className="truncate text-sm font-semibold text-neutral-800">
              <span className="mr-2 text-neutral-400">{index + 1}.</span>
              {field.itemLabel?.(item) || `${field.itemName || 'Item'} ${index + 1}`}
            </p>
            <span className="flex shrink-0 text-neutral-500">
              <RowButton label="Move up" onClick={() => move(index, -1)} disabled={index === 0}>
                <ArrowUp size={14} />
              </RowButton>
              <RowButton label="Move down" onClick={() => move(index, 1)} disabled={index === items.length - 1}>
                <ArrowDown size={14} />
              </RowButton>
              <RowButton label="Remove" danger onClick={() => onChange(items.filter((_, i) => i !== index))}>
                <Trash2 size={14} />
              </RowButton>
            </span>
          </div>
          <div className="p-4">
            <FormBuilder
              fields={field.fields}
              value={item}
              onChange={(next) => onChange(items.map((current, i) => (i === index ? next : current)))}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, blank])}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-black/20 px-3 py-2 text-xs font-semibold text-neutral-600 hover:border-brand-500 hover:text-brand-600"
      >
        <Plus size={13} /> {field.addLabel || 'Add item'}
      </button>
    </div>
  );
}

function RowButton({ label, danger = false, children, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`rounded p-1.5 disabled:opacity-30 ${danger ? 'hover:bg-red-50 hover:text-red-700' : 'hover:bg-black/5'}`}
      {...rest}
    >
      {children}
    </button>
  );
}
