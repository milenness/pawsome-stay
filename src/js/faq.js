import Accordion from 'accordion-js';

// Load vendor FAQ styles after initial render to keep them off critical path.
import('accordion-js/dist/accordion.min.css');

new Accordion('#faq-accordion', {
  duration: 300,
  showMultiple: false,
});
