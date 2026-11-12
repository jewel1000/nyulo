import { useCallback, useEffect, useMemo, useState } from 'react';
import { ExternalLink, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { admin } from '../api/client.js';
import FormBuilder from '../components/FormBuilder.jsx';
import { Alert, Button, Card, Drawer, PageHeader, Spinner } from '../components/ui.jsx';
import { RESOURCES } from '../config/resources.jsx';

/** List + create/edit/delete screen for one content collection, driven by config/resources. */
export default function ResourcePage({ name }) {
  const config = RESOURCES[name];
  const [records, setRecords] = useState(null);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null); // { id?, values }
  const [notice, setNotice] = useState(null);
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await admin.get(`/resources/${name}`);
      setRecords(response.data);
    } catch (error) {
      setNotice({ type: 'error', message: error.message });
      setRecords([]);
    }
  }, [name]);

  useEffect(() => {
    setRecords(null);
    setQuery('');
    setNotice(null);
    setEditing(null);
    load();
  }, [load]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return records || [];
    return (records || []).filter((record) =>
      config.searchKeys.some((key) => String(record[key] ?? '').toLowerCase().includes(term))
    );
  }, [records, query, config]);

  const openEditor = (record) => {
    setFormError(null);
    setEditing(record ? { id: record._id, values: { ...record } } : { values: { ...config.defaults } });
  };
  const closeEditor = useCallback(() => setEditing(null), []);

  const save = async () => {
    setSaving(true);
    setFormError(null);
    // Send only the fields this form edits; the server ignores everything else anyway.
    const payload = Object.fromEntries(
      config.fields.map((field) => [field.name, editing.values[field.name] ?? emptyValueFor(field)])
    );
    try {
      if (editing.id) await admin.patch(`/resources/${name}/${editing.id}`, payload);
      else await admin.post(`/resources/${name}`, payload);
      setNotice({ type: 'success', message: `${capitalise(config.singular)} saved. The website is already updated.` });
      setEditing(null);
      await load();
    } catch (error) {
      setFormError(error);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (record) => {
    const label = record.title || record.name;
    if (!window.confirm(`Delete “${label}”? This removes it from the website and cannot be undone.`)) return;
    try {
      await admin.delete(`/resources/${name}/${record._id}`);
      setNotice({ type: 'success', message: `“${label}” deleted.` });
      await load();
    } catch (error) {
      setNotice({ type: 'error', message: error.message });
    }
  };

  return (
    <>
      <PageHeader
        title={config.title}
        description={config.description}
        actions={
          <Button onClick={() => openEditor(null)}>
            <Plus size={16} /> Add {config.singular}
          </Button>
        }
      />

      {notice && (
        <div className="mb-4">
          <Alert type={notice.type} message={notice.message} onClose={() => setNotice(null)} />
        </div>
      )}

      <Card>
        <div className="flex items-center gap-3 border-b border-black/10 px-4 py-3">
          <Search size={16} className="text-neutral-400" />
          <input
            type="search"
            aria-label={`Search ${config.title}`}
            placeholder={`Search ${config.title.toLowerCase()}…`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
          {records && <span className="shrink-0 text-xs text-neutral-400">{visible.length} of {records.length}</span>}
        </div>

        {records === null ? (
          <Spinner />
        ) : visible.length === 0 ? (
          <p className="px-5 py-14 text-center text-sm text-neutral-400">
            {records.length === 0 ? `No ${config.title.toLowerCase()} yet. Add the first one.` : 'Nothing matches that search.'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-[11px] uppercase tracking-wider text-neutral-500">
                  {config.columns.map((column, index) => (
                    <th key={index} className="px-4 py-2.5 font-bold">{column.label}</th>
                  ))}
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {visible.map((record) => (
                  <tr key={record._id} className="hover:bg-neutral-50">
                    {config.columns.map((column, index) => (
                      <td key={index} className="px-4 py-2.5 align-middle">{column.render(record)}</td>
                    ))}
                    <td className="px-4 py-2.5">
                      <div className="flex justify-end gap-1">
                        {config.publicPath && (
                          <a
                            href={`${import.meta.env.VITE_SITE_URL}${config.publicPath(record)}`}
                            target="_blank"
                            rel="noreferrer"
                            title="View on website"
                            aria-label="View on website"
                            className="rounded-lg p-2 text-neutral-500 hover:bg-black/5"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                        <button type="button" title="Edit" aria-label="Edit" onClick={() => openEditor(record)} className="rounded-lg p-2 text-neutral-600 hover:bg-black/5">
                          <Pencil size={15} />
                        </button>
                        <button type="button" title="Delete" aria-label="Delete" onClick={() => remove(record)} className="rounded-lg p-2 text-neutral-500 hover:bg-red-50 hover:text-red-700">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {editing && (
        <Drawer
          title={`${editing.id ? 'Edit' : 'Add'} ${config.singular}`}
          onClose={closeEditor}
          footer={
            <>
              <Button variant="secondary" onClick={closeEditor}>Cancel</Button>
              <Button loading={saving} onClick={save}>Save</Button>
            </>
          }
        >
          {formError && (
            <div className="mb-5">
              <Alert message={formError.message} errors={formError.errors} />
            </div>
          )}
          <FormBuilder
            fields={config.fields}
            value={editing.values}
            onChange={(values) => setEditing((current) => ({ ...current, values }))}
          />
        </Drawer>
      )}
    </>
  );
}

const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);

/** What an untouched field is sent as, so lists stay lists and switches stay booleans. */
const emptyValueFor = (field) => {
  if (['list', 'images', 'paragraphs'].includes(field.type)) return [];
  if (field.type === 'checkbox') return false;
  return '';
};
