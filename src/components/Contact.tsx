import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { SendResult } from '../types';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<SendResult | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setSendResult({
        ok: false,
        msg: 'Email service not configured. Please email hello@yukthapriya.com directly.',
      });
      return;
    }

    setSending(true);
    setSendResult(null);

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
      setSendResult({ ok: true, msg: 'Message sent — thank you! I will reply within 48 hours.' });
      form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setSendResult({
        ok: false,
        msg: 'Failed to send message. Please try again or email hello@yukthapriya.com directly.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Let's build at scale</h2>
        <p className="section-subtitle">
          Open to Senior / Staff / Principal roles across product engineering, ML/AI, and data platforms.
          I enjoy architecture, mentoring, and technical leadership.
        </p>

        <div
          ref={ref}
          className={`contact-grid fade-in-section${isVisible ? ' visible' : ''}`}
        >
          {/* Info panel */}
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope" aria-hidden="true" />
              <div>
                <strong>Email</strong>
                <a href="mailto:hello@yukthapriya.com">hello@yukthapriya.com</a>
              </div>
            </div>
            <div className="contact-item">
              <i className="fab fa-github" aria-hidden="true" />
              <div>
                <strong>GitHub</strong>
                <a href="https://github.com/yukthapriya" target="_blank" rel="noopener noreferrer">
                  github.com/yukthapriya
                </a>
              </div>
            </div>
            <div className="contact-item">
              <i className="fab fa-linkedin" aria-hidden="true" />
              <div>
                <strong>LinkedIn</strong>
                <a href="https://www.linkedin.com/in/yukthapriya" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/yukthapriya
                </a>
              </div>
            </div>

            <div className="availability-badge">
              <span className="avail-dot" />
              Available for interviews · Flexible start date
            </div>
          </div>

          {/* Contact form */}
          <form
            ref={formRef}
            className="contact-form"
            onSubmit={sendEmail}
            aria-label="Contact form"
            noValidate
          >
            <div className="form-group">
              <label htmlFor="user_name">Your name</label>
              <input id="user_name" name="user_name" type="text" required autoComplete="name" />
            </div>

            <div className="form-group">
              <label htmlFor="user_email">Your email</label>
              <input id="user_email" name="user_email" type="email" required autoComplete="email" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} required />
            </div>

            <button className="btn btn-primary" type="submit" disabled={sending}>
              {sending ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane" aria-hidden="true" /> Send message
                </>
              )}
            </button>

            {sendResult && (
              <div
                className={`send-result${sendResult.ok ? ' ok' : ' err'}`}
                role="status"
                aria-live="polite"
              >
                <i
                  className={`fas ${sendResult.ok ? 'fa-circle-check' : 'fa-circle-exclamation'}`}
                  aria-hidden="true"
                />{' '}
                {sendResult.msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
