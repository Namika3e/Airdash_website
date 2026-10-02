import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { Button, Media } from '../components/motion/Primitives'
function InterestForm({ contact = false }) {
  const [params] = useSearchParams()
  const [draft, setDraft] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem(contact ? 'airdash-contact-draft' : 'airdash-interest-draft'),
        ) || {}
      )
    } catch {
      return {}
    }
  })
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  const endpoint = contact
    ? import.meta.env.VITE_CONTACT_ENDPOINT
    : import.meta.env.VITE_WAITLIST_ENDPOINT
  async function submit(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    setBusy(true)
    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error('send')
        setStatus(
          contact
            ? 'Your message has been sent. Thank you for getting in touch.'
            : 'You’re on the list. We’ll be in touch with launch updates.',
        )
        event.target.reset()
      } else {
        localStorage.setItem(
          contact ? 'airdash-contact-draft' : 'airdash-interest-draft',
          JSON.stringify(data),
        )
        setStatus(
          'Saved on this device only. Nothing has been sent to AirDash. Return when registration opens to submit your details.',
        )
      }
    } catch {
      setStatus(
        endpoint
          ? 'We couldn’t send your details. Please try again.'
          : 'This browser could not save your draft. Please allow local storage and try again.',
      )
    } finally {
      setBusy(false)
    }
  }
  return (
    <form className="interest-form" onSubmit={submit}>
      {!endpoint && (
        <p className="form-notice">
          {contact ? 'Messages aren’t open yet.' : 'Registration is opening soon.'} You can save
          your details on this device for now.
        </p>
      )}
      <label>
        Your name
        <input
          name="name"
          defaultValue={draft.name || ''}
          autoComplete="name"
          required
          maxLength={100}
          placeholder="Full name"
        />
      </label>
      <label>
        Email address
        <input
          name="email"
          defaultValue={draft.email || ''}
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          placeholder="you@example.com"
        />
      </label>
      {!contact && (
        <>
          <label>
            Your neighbourhood
            <input
              name="neighbourhood"
              autoComplete="address-level2"
              required
              maxLength={200}
              placeholder="e.g. Ikoyi, Lagos"
              defaultValue={params.get('address') || draft.neighbourhood || ''}
            />
          </label>
          <label>
            I’m interested as a
            <select
              name="interest"
              defaultValue={
                ['merchant', 'community'].includes(params.get('interest'))
                  ? params.get('interest')
                  : draft.interest || 'customer'
              }
            >
              <option value="customer">Customer</option>
              <option value="merchant">Merchant</option>
              <option value="community">Community representative</option>
            </select>
          </label>
        </>
      )}
      {contact && (
        <label>
          Your message
          <textarea
            name="message"
            defaultValue={draft.message || ''}
            required
            rows={4}
            maxLength={3000}
            placeholder="Tell us what’s on your mind."
          />
        </label>
      )}
      <label className="consent">
        <input type="checkbox" required name="consent" value="yes" />
        {endpoint
          ? 'I agree to AirDash using these details to respond to my enquiry or share launch updates.'
          : 'Save my details in this browser. I understand they will not be sent to AirDash.'}
      </label>
      <Button type="submit" disabled={busy}>
        {busy
          ? 'SENDING…'
          : endpoint
            ? contact
              ? 'SEND MESSAGE'
              : 'JOIN THE WAITLIST'
            : 'SAVE MY DETAILS'}
      </Button>
      <p role="status" className="form-status">
        {status}
      </p>
      {!endpoint && (
        <button
          type="button"
          className="text-link"
          onClick={() => {
            try {
              localStorage.removeItem(contact ? 'airdash-contact-draft' : 'airdash-interest-draft')
              setDraft({})
              setStatus('Saved details removed from this device.')
            } catch {
              setStatus('Unable to access saved details.')
            }
          }}
        >
          Clear saved details
        </button>
      )}
    </form>
  )
}
function CoverageCheck() {
  const [params, setParams] = useSearchParams()
  const [address, setAddress] = useState(params.get('address') || '')
  const [checked, setChecked] = useState(Boolean(params.get('address')))
  return (
    <div className="coverage-check">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setParams({ address: address.trim() })
          setChecked(true)
        }}
      >
        <label htmlFor="coverage-address">Your neighbourhood or address</label>
        <div>
          <input
            id="coverage-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            maxLength={200}
            autoComplete="street-address"
            placeholder="e.g. Ikoyi, Lagos"
          />
          <button aria-label="Check availability">
            <ArrowUpRight />
          </button>
        </div>
      </form>
      {checked && (
        <div role="status" className="coverage-result">
          <Check size={22} />
          <h2>Let’s keep you in the loop.</h2>
          <p>
            Availability for <strong>{params.get('address')}</strong> has not been confirmed yet.
            Leave your interest for launch updates.
          </p>
          <Link
            to={`/waitlist?address=${encodeURIComponent(params.get('address') || '')}`}
            className="text-link"
          >
            GET LAUNCH UPDATES <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </div>
  )
}
export default function InformationPage({ page }) {
  useEffect(() => {
    document.title = `${page.label} — AirDash`
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.intro)
  }, [page])
  return (
    <main id="main" className="information-page" tabIndex={-1}>
      <section className="information-hero">
        <div className="information-copy">
          <p className="eyebrow">{page.label}</p>
          <h1>
            {page.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h1>
          <p className="information-intro">{page.intro}</p>
          {page.cta && <Button to={page.to}>{page.cta}</Button>}
          {page.type === 'coverage' && <CoverageCheck />}
          {['waitlist', 'contact'].includes(page.type) && (
            <InterestForm key={page.type} contact={page.type === 'contact'} />
          )}
        </div>
        {page.image && (
          <div className="information-image">
            <Media name={page.image} priority />
            <span className="eyebrow">THE EVERYDAY, ELEVATED.</span>
          </div>
        )}
      </section>
      {page.sections && (
        <section className="information-sections" aria-label="Learn more">
          {page.sections.map(([title, copy]) =>
            page.type === 'faq' ? (
              <details key={title}>
                <summary>
                  {title}
                  <span>+</span>
                </summary>
                <p>{copy}</p>
              </details>
            ) : (
              <article key={title}>
                <h2>{title}</h2>
                <p>{copy}</p>
              </article>
            ),
          )}
        </section>
      )}
    </main>
  )
}
