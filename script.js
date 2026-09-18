const contactForm = document.querySelector('.below_form form');
const submitButton = document.querySelector('.below_form > button');
const projectsContainer = document.querySelector('.projects');
const projectsList = document.querySelector('.project-list');
const projectTabs = document.querySelector('.project-tabs');

const socialIconPaths = {
  Twitter: 'M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.68h1.73L8.29 4.2H6.43L17.8 19.68Z',
  GitHub: 'M12 2.5a9.5 9.5 0 0 0-3 18.51c.47.09.65-.2.65-.45v-1.67c-2.65.58-3.2-1.13-3.2-1.13-.43-1.1-1.05-1.39-1.05-1.39-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.85 1.45 2.23 1.03 2.78.79.09-.62.33-1.03.6-1.27-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.43-1.21.09-2.53 0 0 .8-.26 2.62.98A9.1 9.1 0 0 1 12 7.17c.81 0 1.62.11 2.38.29 1.82-1.24 2.62-.98 2.62-.98.52 1.32.19 2.29.09 2.53.61.67.98 1.52.98 2.56 0 3.67-2.23 4.48-4.36 4.72.34.29.65.86.65 1.74v2.58c0 .25.17.54.65.45A9.5 9.5 0 0 0 12 2.5Z',
  LinkedIn: 'M5.2 3.5A2.2 2.2 0 1 1 5.2 7.9a2.2 2.2 0 0 1 0-4.4ZM3.3 9.6h3.8V21H3.3V9.6Zm6.1 0h3.6v1.56h.05c.5-.95 1.72-1.96 3.55-1.96 3.8 0 4.5 2.5 4.5 5.76V21h-3.8v-5.36c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V21H9.4V9.6Z'
};

class Project {
  constructor({ number, image, imageAlt, label, title, dateRange, description, links }) {
    this.number = number;
    this.image = image;
    this.imageAlt = imageAlt;
    this.label = label;
    this.title = title;
    this.dateRange = dateRange;
    this.description = description;
    this.links = links;
  }

  createLink(url, label) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('aria-label', label);

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', socialIconPaths[label]);
    icon.append(path);
    link.append(icon);

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

    const date = document.createElement('span');
    date.className = 'project-date';
    date.textContent = this.dateRange;

    const description = document.createElement('div');
    description.className = 'project-description';
    const paragraph = document.createElement('p');
    paragraph.textContent = this.description;
    description.append(paragraph);

    const socials = document.createElement('div');
    socials.className = 'project-socials';
    this.links.forEach(({ url, label: linkLabel }) => {
      socials.append(this.createLink(url, linkLabel));
    });

    content.append(label, title, date, description, socials);
    project.append(imageWrapper, content);
    return project;
  }
}

class ProjectTabs {
  constructor(projects, listElement, tabsElement, projectsPerPage = 4) {
    this.projects = projects;
    this.listElement = listElement;
    this.tabsElement = tabsElement;
    this.projectsPerPage = projectsPerPage;
    this.currentPage = 1;
    this.pageCount = Math.ceil(projects.length / projectsPerPage);
  }

  renderPage(pageNumber) {
    this.currentPage = pageNumber;
    this.listElement.replaceChildren();

    const firstProject = (pageNumber - 1) * this.projectsPerPage;
    const pageProjects = this.projects.slice(
      firstProject,
      firstProject + this.projectsPerPage
    );

    pageProjects.forEach((data) => {
      this.listElement.append(new Project(data).render());
    });

    this.updateTabStates();
  }

  updateTabStates() {
    this.tabsElement.querySelectorAll('[role="tab"]').forEach((tab, index) => {
      const isActive = index + 1 === this.currentPage;
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
  }

  createTabs() {
    this.tabsElement.replaceChildren();

    for (let page = 1; page <= this.pageCount; page += 1) {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.role = 'tab';
      tab.textContent = String(page);
      tab.setAttribute('aria-label', `Show project page ${page}`);
      tab.addEventListener('click', () => this.renderPage(page));
      this.tabsElement.append(tab);
    }
  }

  render() {
    this.createTabs();
    this.renderPage(this.currentPage);
  }
}

const navLinks = document.querySelectorAll('.header a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + startY - 90;
    const duration = 1400;
    const startTime = performance.now();

    const easeInOutCubic = (t) => {
      if (t < 0.5) {
        return 4 * t * t * t;
      }
      return 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo({
        top: startY + (targetY - startY) * easedProgress,
        behavior: 'auto'
      });

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  });
});

const projectData = [
  {
    number: 'one',
    image: 'images/coasted.jpg',
    imageAlt: 'Project Screenshot',
    label: 'Coasted Code',
    title: 'AI, Programming & Robotics Instructor  ',
    dateRange: '09/2026 - Present',
    description: 'Teach AI, programming, and robotics to Grade 1–8 students through age-appropriate, hands-on lessons while developing their creativity, computational thinking, and problem-solving skills. Guide students through real-world technology projects, supporting them from ideation to implementation at the end of each academic term.',
    links: [
      { url: '#', label: 'GitHub', icon: '' },
      { url: '#', label: 'Twitter', icon: '' },
      { url: '#', label: 'LinkedIn', icon: '' }
    ]
  },
  {
    number: 'two',
    image: 'images/navida.HEIC',
    imageAlt: 'Project Screenshot',
    label: 'Navida Group of Companies ',
    title: 'Social Media Marketer',
    dateRange: '03/2026 - Present',
    description: 'Manage and grow the digital presence of Navida’s multiple brands by creating engaging video content, 3D advertisements, and promotional materials, while improving audience engagement and overall brand visibility.',
    links: [
      { url: '#', label: 'GitHub', icon: '' },
      { url: '#', label: 'Twitter', icon: '' },
      { url: '#', label: 'LinkedIn', icon: '' }
    ]
  },
  {
    number: 'one',
    image: 'images/bountiful.HEIC',
    imageAlt: 'Project Screenshot',
    label: 'Bountiful Technologies',
    title: 'STEM Instructor',
    dateRange: '01/2026 - 09/2026',
    description: 'Taught foundational STEM and computer science concepts to primary and junior high school students while supporting robotics competitions through student preparation, event setup, and coordination.',
    links: [
      { url: '#', label: 'GitHub', icon: '' },
      { url: '#', label: 'Twitter', icon: '' },
      { url: '#', label: 'LinkedIn', icon: '' }
    ]
  },
  {
    number: 'two',
    image: 'images/enspire.HEIC',
    imageAlt: 'Project Screenshot',
    label: 'EnspireFX Websites',
    title: 'Web Developer',
    dateRange: '10/2025 - 12/2025',
    description: 'Gained hands-on experience across the web development lifecycle, from client needs assessment and UI/UX design to full-stack website development. Contributed to client projects including Owusu and Family Law Firm and Obaakro News, refining designs and frontend solutions based on feedback, while also writing and publishing news articles for the Ghanaian Standard.',
    links: [
      { url: '#', label: 'GitHub', icon: '' },
      { url: '#', label: 'Twitter', icon: '' },
      { url: '#', label: 'LinkedIn', icon: '' }
    ]
  },
  {
    number: 'one',
    image: 'images/bountiful.HEIC',
    imageAlt: 'Project Screenshot',
    label: 'Bountiful Technologies',
    title: 'STEM Instructor',
    dateRange: '01/2026 - 09/2026',
    description: 'Taught foundational STEM and computer science concepts to primary and junior high school students while supporting robotics competitions through student preparation, event setup, and coordination.',
    links: [
      { url: '#', label: 'GitHub', icon: '' },
      { url: '#', label: 'Twitter', icon: '' },
      { url: '#', label: 'LinkedIn', icon: '' }
    ]
  }
];

if (projectsContainer && projectsList && projectTabs) {
  new ProjectTabs(projectData, projectsList, projectTabs).render();
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

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe tech icons
const techIcons = document.querySelectorAll('.tech-icon');
techIcons.forEach((icon) => {
  icon.classList.add('tech-animate');
  scrollObserver.observe(icon);
});

// Observe projects
const projects = document.querySelectorAll('.project');
projects.forEach((project) => {
  project.classList.add('project-animate');
  scrollObserver.observe(project);
});

// Observe contact section
const contactGroup = document.querySelector('.contact_group');
if (contactGroup) {
  contactGroup.classList.add('scroll-animate');
  scrollObserver.observe(contactGroup);
}

// Observe about section
const aboutSection = document.querySelector('.about');
if (aboutSection) {
  aboutSection.classList.add('scroll-animate');
  scrollObserver.observe(aboutSection);
}
