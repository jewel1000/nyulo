import { useCallback, useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { admin, site } from '../api/client.js';
import FormBuilder, { Repeater } from '../components/FormBuilder.jsx';
import { Alert, Button, Card, PageHeader, Spinner } from '../components/ui.jsx';
import { SITE_SECTIONS } from '../config/siteSections.js';

/** Edits the parts of the site that are not collections: company details, hero, stats, … */
export default function SiteContentPage() {
  const [content, setContent] = useState(null);
  const [activeKey, setActiveKey] = useState(SITE_SECTIONS[0].key);
  const [draft, setDraft] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  const section = SITE_SECTIONS.find((item) => item.key === activeKey);

  const load = useCallback(async () => {
    try {
      // Read through the public API, which fills anything unsaved with the built-in default.
      const response = await site.get('/settings');
      setContent(response.data);
      return response.data;
    } catch (error) {
      setNotice({ type: 'error', message: `Could not load the site content: ${error.message}` });
      return null;
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (content) {
      setDraft(structuredClone(content[activeKey]));
      setDirty(false);
    }
  }, [content, activeKey]);

  const switchTo = (key) => {
    if (dirty && !window.confirm('You have unsaved changes in this section. Leave without saving?')) return;
    setNotice(null);
    setActiveKey(key);
  };

  const change = (value) => {
    setDraft(value);
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    setNotice(null);
    try {
      await admin.put(`/settings/${activeKey}`, { value: draft });
      await load();
      setNotice({ type: 'success', message: `“${section.label}” saved. The website is already updated.` });
    } catch (error) {
      setNotice({ type: 'error', message: error.message, errors: error.errors });
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!window.confirm(`Reset “${section.label}” to the original content? Your changes to this section will be lost.`)) return;
    setSaving(true);
    try {
      await admin.delete(`/settings/${activeKey}`);
      await load();
      setNotice({ type: 'success', message: `“${section.label}” reset to the original content.` });
    } catch (error) {
      setNotice({ type: 'error', message: error.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="Site content" description="Text and photos that appear across the website outside the collections." />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Site sections" className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {SITE_SECTIONS.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-current={item.key === activeKey}
              onClick={() => switchTo(item.key)}
              className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                item.key === activeKey ? 'bg-brand-500 text-white' : 'text-neutral-600 hover:bg-black/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div>
          {notice && (
            <div className="mb-4">
              <Alert type={notice.type} message={notice.message} errors={notice.errors} onClose={() => setNotice(null)} />
            </div>
          )}

          <Card className="p-6">
            <div className="mb-6 border-b border-black/10 pb-4">
              <h2 className="font-display text-xl font-semibold">{section.label}</h2>
              <p className="mt-1 text-sm text-neutral-500">{section.description}</p>
            </div>

            {draft === null ? (
              <Spinner />
            ) : section.kind === 'list' ? (
              <Repeater field={section} value={draft} onChange={change} />
            ) : (
              <FormBuilder fields={section.fields} value={draft} onChange={change} />
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-5">
              <Button variant="ghost" size="sm" onClick={reset} disabled={saving}>
                <RotateCcw size={14} /> Reset to original
              </Button>
              <div className="flex items-center gap-3">
                {dirty && <span className="text-xs font-semibold text-amber-700">Unsaved changes</span>}
                <Button loading={saving} disabled={!dirty} onClick={save}>
                  Save changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
