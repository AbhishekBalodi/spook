document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const body = document.body;
  const sidebar = document.querySelector('.mdc-drawer-menu');

  if (document.querySelector('.mdc-drawer')) {
    const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

    // Toggler icon click function
    document.querySelector('.sidebar-toggler').addEventListener('click', () => {
      drawer.open = !drawer.open;
    });
  }

  // Initially collapsed drawer in viewports below desktop width
  if (window.matchMedia('(max-width: 991px)').matches) {
    const drawerElement = document.querySelector('.mdc-drawer.mdc-drawer--dismissible');
    if (drawerElement && drawerElement.classList.contains('mdc-drawer--open')) {
      drawerElement.classList.remove('mdc-drawer--open');
    }
  }

  // Add active class to nav-link based on URL dynamically
  const currentPath = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
  const drawerLinks = sidebar.querySelectorAll('.mdc-drawer-item .mdc-drawer-link');
  drawerLinks.forEach(link => {
    if (currentPath === "") {
      // For root URL
      if (link.getAttribute('href').includes("index.html")) {
        link.classList.add('active');
        if (link.closest('.mdc-expansion-panel')) {
          link.closest('.mdc-expansion-panel').classList.add('expanded');
        }
      }
    } else {
      // For other URLs
      if (link.getAttribute('href').includes(currentPath)) {
        link.classList.add('active');
        if (link.closest('.mdc-expansion-panel')) {
          const panel = link.closest('.mdc-expansion-panel');
          panel.classList.add('expanded');
          panel.style.display = 'block';
        }
      }
    }
  });

  // Toggle Sidebar items
  const toggleButtons = document.querySelectorAll('[data-toggle="expansionPanel"]');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Close other items
      const otherPanels = document.querySelectorAll('.mdc-expansion-panel');
      otherPanels.forEach(panel => {
        if (panel !== document.getElementById(button.getAttribute('data-target'))) {
          panel.style.display = 'none';
          panel.previousElementSibling.classList.remove('expanded');
        }
      });

      // Open/close the clicked toggle menu
      const targetPanel = document.getElementById(button.getAttribute('data-target'));
      if (targetPanel) {
        targetPanel.classList.toggle('expanded');
        targetPanel.style.display = targetPanel.style.display === 'block' ? 'none' : 'block';
      }
    });
  });

  // Add expanded class to mdc-drawer-link after expanded
  const expansionPanels = document.querySelectorAll('.mdc-drawer-item .mdc-expansion-panel');
  expansionPanels.forEach(panel => {
    panel.previousElementSibling.addEventListener('click', () => {
      panel.previousElementSibling.classList.toggle('expanded');
    });
  });

  // Applying PerfectScrollbar to the sidebar if not RTL
  if (!body.classList.contains('rtl')) {
    const drawerContent = document.querySelector('.mdc-drawer .mdc-drawer__content');
    if (drawerContent) {
      new PerfectScrollbar(drawerContent);
    }
  }
});
