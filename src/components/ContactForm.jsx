import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import ContactInfo from '../utils/ContactInfo';
import './ContactForm.css';

function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Get recipient email from ContactInfo
      const recipientEmail = ContactInfo.getEmail();

      // Create mailto link with form data
      const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      // Open default email client
      window.location.href = mailtoLink;

      // Show success message
      setSubmitStatus('success');
      alert(t.contact.successMessage);

      // Reset form after short delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitStatus(null);
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      alert(t.contact.errorMessage || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-section">
      <h2>{t.contact.formTitle}</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">{t.contact.nameLabel}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={t.contact.namePlaceholder}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">{t.contact.emailLabel}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={t.contact.emailPlaceholder}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">{t.contact.subjectLabel}</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder={t.contact.subjectPlaceholder}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">{t.contact.messageLabel}</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            placeholder={t.contact.messagePlaceholder}
          ></textarea>
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? '...' : t.contact.submitButton}
        </button>

        {submitStatus === 'success' && (
          <div className="form-message success">{t.contact.successMessage}</div>
        )}
        {submitStatus === 'error' && (
          <div className="form-message error">{t.contact.errorMessage || 'An error occurred.'}</div>
        )}
      </form>
    </div>
  );
}

export default ContactForm;
