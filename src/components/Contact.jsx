import { useState } from 'react';
import './Contact.css';
import { portfolioData } from '../data/portfolioData';
import { 
  Mail, 
  Phone,
  Copy, 
  Check, 
  Send, 
  MessageSquare, 
  ArrowUpRight,
  MapPin
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Contact() {
  const { profile } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.rawPhone || profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare direct mailto with form parameters
    const subjectParam = encodeURIComponent(formState.subject || `Portfolio Inquiry from ${formState.name}`);
    const bodyParam = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subjectParam}&body=${bodyParam}`;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="section-wrapper contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot"></span>
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title">
            Let's Discuss Opportunities &amp; New Ideas
          </h2>
          <p className="section-description">
            Whether you have an opening for a Flutter developer, a project collaboration, or just want to connect, my inbox is always open.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="contact-grid">
          {/* Left Column: Direct Channels & Socials */}
          <div className="contact-channels">
            {/* Primary Email Card */}
            <div className="contact-card card primary-contact">
              <div className="channel-icon-wrap">
                <Mail size={24} color="#CEFF00" />
              </div>
              <div className="channel-info">
                <span className="channel-label">Direct Email</span>
                <span className="channel-value">{profile.email}</span>
                <p className="channel-sub">
                  Actively monitored for interviews &amp; opportunities
                </p>
              </div>

              <div className="channel-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm copy-btn"
                  onClick={handleCopyEmail}
                  title="Copy email address to clipboard"
                >
                  {copied ? <Check size={14} color="#CEFF00" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                </button>

                <a
                  href={`mailto:${profile.email}`}
                  className="btn btn-primary btn-sm"
                  title="Open mail client"
                >
                  <Send size={14} />
                  <span>Send Mail</span>
                </a>
              </div>
            </div>

            {/* Direct Phone / Call Card */}
            <div className="contact-card card phone-contact">
              <div className="channel-icon-wrap phone">
                <Phone size={22} color="#38BDF8" />
              </div>
              <div className="channel-info">
                <span className="channel-label">Direct Phone / Mobile</span>
                <span className="channel-value">{profile.phoneDisplay}</span>
                <p className="channel-sub">Available for calls &amp; WhatsApp communication</p>
              </div>

              <div className="channel-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm copy-btn"
                  onClick={handleCopyPhone}
                  title="Copy phone number to clipboard"
                >
                  {copiedPhone ? <Check size={14} color="#CEFF00" /> : <Copy size={14} />}
                  <span>{copiedPhone ? 'Copied!' : 'Copy'}</span>
                </button>

                <a
                  href={`tel:${profile.phone}`}
                  className="btn btn-secondary btn-sm"
                  title={`Call ${profile.phone}`}
                >
                  <Phone size={14} />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card card channel-link-card"
            >
              <div className="channel-icon-wrap linkedin">
                <LinkedinIcon size={22} />
              </div>
              <div className="channel-info">
                <span className="channel-label">LinkedIn Profile</span>
                <span className="channel-value">linkedin.com/in/manirathinam04</span>
                <p className="channel-sub">Connect for professional updates &amp; messaging</p>
              </div>
              <ArrowUpRight size={18} className="channel-arrow" />
            </a>

            {/* GitHub Card */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card card channel-link-card"
            >
              <div className="channel-icon-wrap github">
                <GithubIcon size={22} />
              </div>
              <div className="channel-info">
                <span className="channel-label">GitHub Repositories</span>
                <span className="channel-value">github.com/Manirathinam-04</span>
                <p className="channel-sub">Inspect source code, widgets &amp; repositories</p>
              </div>
              <ArrowUpRight size={18} className="channel-arrow" />
            </a>

            {/* Location & Status Badge */}
            <div className="contact-meta-card card">
              <div className="meta-row">
                <MapPin size={16} color="#CEFF00" />
                <span>{profile.location}</span>
              </div>
              <div className="meta-divider"></div>
              <div className="meta-row">
                <span className="pulse-indicator">
                  <span className="ping"></span>
                  <span className="dot"></span>
                </span>
                <span className="status-highlight">{profile.availability}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Inquiry Form */}
          <div className="contact-form-container card">
            <div className="form-header">
              <div className="form-icon-badge">
                <MessageSquare size={18} color="#CEFF00" />
              </div>
              <div>
                <h3 className="form-title">Send a Direct Message</h3>
                <p className="form-subtitle">Generates a prefilled email via your preferred mail client</p>
              </div>
            </div>

            {formSubmitted ? (
              <div className="form-success-state">
                <div className="success-icon-wrap">
                  <Check size={28} color="#CEFF00" />
                </div>
                <h4>Message Composed!</h4>
                <p>
                  Your mail application was launched. If it didn't open automatically, you can directly email{' '}
                  <strong>{profile.email}</strong>.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setFormSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formState.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Your Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    required
                    placeholder="e.g. Flutter Mobile Developer Opportunity"
                    value={formState.subject}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows="5"
                    placeholder="Tell me about your application requirements, role, or project..."
                    value={formState.message}
                    onChange={handleChange}
                    className="form-input form-textarea"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  <Send size={16} />
                  <span>Send Message via Email</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
