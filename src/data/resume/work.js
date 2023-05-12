/**
 * @typedef {Object} Position
 * Conforms to https://jsonresume.org/schema/
 *
 * @property {string} name - Name of the company
 * @property {string} position - Position title
 * @property {string} url - Company website
 * @property {string} startDate - Start date of the position in YYYY-MM-DD format
 * @property {string|undefined} endDate - End date of the position in YYYY-MM-DD format.
 * If undefined, the position is still active.
 * @property {string|undefined} summary - html/markdown summary of the position
 * @property {string[]} highlights - plain text highlights of the position (bulleted list)
 */
const work = [
  {
    name: 'Ford',
    position: 'Services Marketing Manager, Safety and Security - Connected Services',
    url: 'https://www.ford.com',
    startDate: '2022-04-01',
    highlights: [
      'Launching new digital safety and security-focused connected services for Ford owners',
    ],
  },
  {
    name: 'Ford',
    position: 'Strategy Manager, Data Products - Connected Services',
    url: 'https://www.ford.com',
    startDate: '2020-02-01',
    highlights: [
      'Helping drive product, strategy, and new business initiatives for connected vehicle data products and services',
    ],
  },
  {
    name: 'Ford',
    position: 'Product Manager, City Solutions - Mobility Services',
    url: 'https://www.ford.com',
    startDate: '2018-10-01',
    highlights: [
      'Helped build software for new mobility services',
    ],
  },
  {
    name: 'Ford',
    position: 'Strategy Manager, Corporate Strategy - Mobility Services',
    url: 'https://www.ford.com',
    startDate: '2017-07-01',
    highlights: [
      'Supported key corporate strategic planning initiatives',
    ],
  },
  {
    name: 'Vantage Point Advisors',
    position: 'Senior Associate, Valuation Services',
    url: 'https://vpadvisors.com',
    startDate: '2012-04-01',
    highlights: [
      'Developed financial models for financial reporting, strategic planning and valuation advisory purposes',
    ],
  },
  {
    name: 'Cabrillo Advisors',
    position: 'Analyst, Valuation Services',
    url: 'https://cabrilloadvisors.com',
    startDate: '2011-03-01',
    highlights: [
      'Developed financial models for valuation and financial advisory services',
    ],
  },
  {
    name: 'BeyondTrust',
    position: 'Associate, Corporate Development',
    url: 'https://beyondtrust.com',
    startDate: '2009-08-01',
    highlights: [
      'Supported key corporate strategic initiatives including the acquisition and integration of an enterprise security software company',
    ],
  },
];

export default work;
