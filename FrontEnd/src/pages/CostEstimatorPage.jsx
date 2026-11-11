import { useState } from 'react';
import PageHero from '../components/common/PageHero.jsx';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';
import EstimatorForm from '../components/estimator/EstimatorForm.jsx';
import EstimateResult from '../components/estimator/EstimateResult.jsx';

export default function CostEstimatorPage() {
  const [result, setResult] = useState(null);

  return (
    <>
      <PageHero
        eyebrow="Budget Planner"
        title="How Much Will My Interior Cost?"
        subtitle="Pick your space type, package and area — get an instant, transparent budget range in seconds."
      />
      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <EstimatorForm onResult={(quote, formInput) => setResult({ quote, formInput })} />
          </Reveal>
          <Reveal delay={120}>
            {result ? (
              <EstimateResult quote={result.quote} formInput={result.formInput} />
            ) : (
              <div className="flex h-full min-h-72 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 p-10 text-center">
                <p className="font-display text-2xl font-semibold text-ink-400">Your estimate appears here</p>
                <p className="max-w-sm text-sm text-ink-400">
                  Fill in the form to see a budget range with a full cost breakdown — materials, labor,
                  design and project management.
                </p>
              </div>
            )}
          </Reveal>
        </Container>
      </section>
    </>
  );
}
