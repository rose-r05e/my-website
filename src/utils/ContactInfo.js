/**
 * ContactInfo class - Centralized storage for contact information
 * Use getters to access contact details anywhere in the application
 */
class ContactInfo {
  static #email = 'yourusername@emailprovider.you';
  static #github = 'https://github.com/yourusername';
  static #linkedin = 'https://linkedin.com/in/yourprofile';

  /**
   * Get email address
   * @returns {string} Email address
   */
  static getEmail() {
    return this.#email;
  }

  /**
   * Get GitHub profile URL
   * @returns {string} GitHub URL
   */
  static getGithub() {
    return this.#github;
  }

  /**
   * Get LinkedIn profile URL
   * @returns {string} LinkedIn URL
   */
  static getLinkedin() {
    return this.#linkedin;
  }
  
}

export default ContactInfo;
