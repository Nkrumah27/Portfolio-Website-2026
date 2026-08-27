const contactForm = document.querySelector('.below_form form');
const submitButton = document.querySelector('.below_form > button');
const projectsContainer = document.querySelector('.projects');

class Project {
  constructor({ number, image, imageAlt, label, title, description, links }) {
    this.number = number;
    this.image = image;
    this.imageAlt = imageAlt;
    this.label = label;
    this.title = title;
    this.description = description;
    this.links = links;
  }

  createLink(url, label, icon) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('aria-label', label);
    link.textContent = icon;
    return link;
  }

  render() {
    const project = document.createElement('article');
    project.className = `project project-${this.number}`;

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'project-image';

    const image = document.createElement('img');
    image.src = this.image;
    image.alt = this.imageAlt;
    imageWrapper.append(image);

    const content = document.createElement('div');
    content.className = 'project-content';

    const label = document.createElement('span');
    label.className = 'project-label';
    label.textContent = this.label;

    const title = document.createElement('h2');
    title.textContent = this.title;

    const description = document.createElement('div');
    description.className = 'project-description';
    const paragraph = document.createElement('p');
    paragraph.textContent = this.description;
    description.append(paragraph);

    const socials = document.createElement('div');
    socials.className = 'project-socials';
    this.links.forEach(({ url, label: linkLabel, icon }) => {
      socials.append(this.createLink(url, linkLabel, icon));
    });

    content.append(label, title, description, socials);
    project.append(imageWrapper, content);
    return project;
  }
}

const projectData = [
  {
    number: 'one',
    image: 'images/profile_pic.png',
    imageAlt: 'Project Screenshot',
    label: 'Featured Project',
    title: 'Example Project',
    description: 'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.',
    links: [
      { url: '#', label: 'GitHub', icon: '' },
      { url: '#', label: 'Twitter', icon: '' },
      { url: '#', label: 'LinkedIn', icon: '' }
    ]
  },
  {
    number: 'two',
    image: 'images/profile_pic.png',
    imageAlt: 'Project Screenshot',
    label: 'Featured Project',
    title: 'Example Project',
    description: 'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.',
    links: [
      { url: '#', label: 'GitHub', icon: '' },
      { url: '#', label: 'Twitter', icon: '' },
      { url: '#', label: 'LinkedIn', icon: '' }
    ]
  },
  {
    number: 'one',
    image: 'images/profile_pic.png',
    imageAlt: 'Project Screenshot',
    label: 'Featured Project',
    title: 'Example Project',
    description: 'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.',
    links: [
      { url: '#', label: 'GitHub', icon: '' },
      { url: '#', label: 'Twitter', icon: '' },
      { url: '#', label: 'LinkedIn', icon: '' }
    ]
  },
  {
    number: 'two',
    image: 'images/profile_pic.png',
    imageAlt: 'Project Screenshot',
    label: 'Featured Project',
    title: 'Example Project',
    description: 'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.',
    links: [
      { url: '#', label: 'GitHub', icon: '' },
      { url: '#', label: 'Twitter', icon: '' },
      { url: '#', label: 'LinkedIn', icon: '' }
    ]
  }
];

if (projectsContainer) {
  projectData.forEach((data) => {
    projectsContainer.append(new Project(data).render());
  });
}

if (contactForm && submitButton) {
  submitButton.addEventListener('click', () => {
    if (!contactForm.reportValidity()) {
      return;
    }

    submitButton.textContent = 'Message Sent';
    submitButton.disabled = true;

    window.setTimeout(() => {
      contactForm.reset();
      submitButton.textContent = 'Send Message';
      submitButton.disabled = false;
    }, 2000);
  });
}
