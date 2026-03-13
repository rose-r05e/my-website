import contactInfoXml from './contactInfo.xml?raw';

function readTag(doc, tagName) {
  return doc.querySelector(tagName)?.textContent?.trim() ?? '';
}

function parseContactInfo() {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(contactInfoXml, 'application/xml');

  return {
    email: readTag(xmlDoc, 'email'),
    github: readTag(xmlDoc, 'github'),
    linkedin: readTag(xmlDoc, 'linkedin'),
  };
}

const contactInfo = parseContactInfo();

export function getEmail() {
  return contactInfo.email;
}

export function getGithub() {
  return contactInfo.github;
}

export function getLinkedin() {
  return contactInfo.linkedin;
}
