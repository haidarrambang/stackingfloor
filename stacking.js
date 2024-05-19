const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const natural = require('natural');
const { dir } = require('console');

const csvWriter = createCsvWriter({
  path: 'stackingfloor.csv',
  header: [
      {id: 'Employee ID', title: 'Employee ID'},
      {id: 'Employee Name', title: 'Employee Name'},
      {id: 'Department', title: 'Department'},
      {id: 'Division', title: 'Division'},
      {id: 'Directorate', title: 'Directorate'},
      {id: 'floor', title: 'Floor'}
  ]
});

// Fungsi untuk memeriksa apakah sebuah kalimat mengandung kata kunci
function containsKeyword(sentence, keyword) {
  return sentence.includes(keyword);
}
// Array untuk menyimpan baris-baris yang difilter
let filteredRows = [];
// let filteredSecond = [];

// Membaca file CSV dan menyaring data
fs.createReadStream('planning.csv')
.pipe(csv())
.on('data', (row, index) => {
    // Misalnya, kita ingin menyaring baris berdasarkan kolom 'Color', 'Year' dan 'Price' 
    const department = row.Department || '';
    const division = row.Division || '';
    const directorate = row.Directorate || '';

    if (
        containsKeyword(department, 'Service Operation Center') 
    ) { 
      if (containsKeyword(directorate, 'Technology')){
      filteredRows.push({...row, floor: '11'});
      }
    }
    if (
      containsKeyword(department, 'E2E Region Operation Jabo') 
      || containsKeyword(department, 'Strategic Operation & Automation')
      || containsKeyword(department, 'E2E Region Operation Central')
      || containsKeyword(department, 'Governance & 3rd Party Management')
      || containsKeyword(department, 'Enterprise Network Operation')
      || containsKeyword(department, 'E2E Region Operation Kalimantan')
      || containsKeyword(department, 'E2E Region Operation West')
      || containsKeyword(department, 'E2E Region Operation East')
      && containsKeyword(division, 'Service Operation Management')
      ) { 
        if (containsKeyword(directorate, 'Technology')) {
          filteredRows.push({...row, floor: '12'});
        }
        }
        if (
          !department &&
          containsKeyword(division, 'Service Operation Management') &&
          containsKeyword(directorate, 'Technology')
        ) { 
          filteredRows.push({...row, floor: '12'});
        }
    if (
        containsKeyword(department, 'Enterprise Planning & Architecture')
        || containsKeyword(department, 'Digital Platform')
        || containsKeyword(department, 'IT Project Management')
        || containsKeyword(department, 'IT Strategy & Planning') 
        || containsKeyword(division, 'Digital Touchpoint')
        || containsKeyword(division, 'IT Strategy Planning & Architecture')
    ) { 
      if(containsKeyword(directorate, 'IT Digital')){
      filteredRows.push({...row, floor: '16'});
    }
    }
    if (
      containsKeyword(department, 'Enterprise Support System') 
      || containsKeyword(department, 'API & Micro-services') 
      || containsKeyword(department, 'IT Core Charging Support System')
      || containsKeyword(department, 'IT Core Charging')
      ) { 
      if (containsKeyword(directorate, 'IT Digital') || containsKeyword(directorate, 'Technology')) {
          filteredRows.push({...row, floor: '17'});
      }
      }
    if (
      containsKeyword(department, 'Helpdesk & Quality Assurance')
      || containsKeyword(department, 'Contact Centre Premium & Corp')
      || containsKeyword(department, 'Customer Centre Mass')
      || containsKeyword(department, 'Knowledge Management & System Support')
      || containsKeyword(division, 'Customer Contact Center')
    ) { 
      if(containsKeyword(directorate, 'Commercial - Consumer')){
      filteredRows.push({...row, floor: '18'});
    }
    }
    if (
      containsKeyword(department, 'Program Office')
      || containsKeyword(department, 'RAN & Infrastructure Planning & Design')
      || containsKeyword(department, 'Transport Access & Convergence Planning & Design')
      || containsKeyword(department, 'Network Roll-Out')
      || containsKeyword(department, 'Enterprise Project')
      || containsKeyword(department, 'Technology Strategy')
      || containsKeyword(department, 'Cost Management & Technology Assurance')
      || containsKeyword(department, 'Core Network Planning & Design')
      || containsKeyword(department, 'IT Infrastructure Planning & Design')
      || containsKeyword(department, 'FTTH Project & Service Delivery')
      || containsKeyword(department, 'Network Insight')
      || containsKeyword(department, 'Network Planning Assurance')
      || containsKeyword(department, 'Material Management & Warehousing')
      || containsKeyword(department, 'New Ventures & Technology Incubation')
      || containsKeyword(department, 'Capacity Management')
      || containsKeyword(department, 'Transport IP & Optical Backbone')
      || containsKeyword(division, 'Technology Strategy & Assurance') 
      || containsKeyword(division, 'Network Planning & Design')
      || containsKeyword(division, 'Program Management')
    ) { 
      if(containsKeyword(directorate, 'Technology')){
      filteredRows.push({...row, floor: '19'});
      }
    }
    if (
      containsKeyword(department, 'IT Service Operations')
      || containsKeyword(department, 'DevOps')
      || containsKeyword(department, 'Hacking Detection')
      || containsKeyword(department, 'IT Risk Governance & Controls')
      || containsKeyword(department, 'IT Business Analyst')
      || containsKeyword(department, 'Corporate Strategy')
      || containsKeyword(department, 'Home Marketing')
      || containsKeyword(department, 'Technology Security')
      || containsKeyword(department, 'IT Transformation Development') 
      || containsKeyword(division, 'IT Transformation & Digitalization')
    ) { 
      if(containsKeyword(directorate, 'IT Digital')|| containsKeyword(directorate, 'Strategy & Analytics')
      || containsKeyword(directorate, 'Home Business') || containsKeyword(directorate, 'Commercial - Home & Convergence')){
      filteredRows.push({...row, floor: '26'});
    }
    }
    if(
        !department &&
        containsKeyword(division, 'IT Business Partner & Project Management')
    ){
      if(containsKeyword(directorate, 'IT Digital')|| containsKeyword(directorate, 'Strategy & Analytics')
        || containsKeyword(directorate, 'Home Business') || containsKeyword(directorate, 'Commercial - Home & Convergence')){
        filteredRows.push({...row, floor: '26'});
      }
    }
    if(
      !department &&
      containsKeyword(division, 'Corporate Strategy')
  ){
    if(containsKeyword(directorate, 'IT Digital')|| containsKeyword(directorate, 'Strategy & Analytics')
      || containsKeyword(directorate, 'Home Business') || containsKeyword(directorate, 'Commercial - Home & Convergence')){
      filteredRows.push({...row, floor: '26'});
    }
  }
    if(
      !department &&
      containsKeyword(division, 'Technology Security & Risk Controls')
    ){
      if(containsKeyword(directorate, 'IT Digital')){
        filteredRows.push({...row, floor: '26'});
      }
    }
    if (
      containsKeyword(department, 'External Communication & Media Management')
      || containsKeyword(department, 'Employee Relations')
      || containsKeyword(department, 'Corporate Legal')
      || containsKeyword(department, 'Regulatory Strategy & Privacy Office')
      || containsKeyword(department, 'Convergence Advisory & Compliance Management')
      || containsKeyword(department, 'HC Digitalization & Resource Management')
      || containsKeyword(department, 'Government & Stakeholder Relations')
      || containsKeyword(department, 'Facility Planning & Development')
      || containsKeyword(department, 'Communication Channel & CSR Management')
      || containsKeyword(department, 'Litigation')
      || containsKeyword(department, 'Talent Management')
      || containsKeyword(department, 'Learning & Culture Development')
      || containsKeyword(department, 'Rewards Management')
      || containsKeyword(department, 'Sustainability')
      || containsKeyword(department, 'Facility Operations & HSE)')
      || containsKeyword(department, 'Talent Acquisition')
      || containsKeyword(department, 'Corporate Brand & Internal Communications')
      || containsKeyword(division, 'Corporate Communications')
      || containsKeyword(division, 'People Services & Facility Management')
      || containsKeyword(division, 'Legal') 
      || containsKeyword(division, 'People Journey')
      || containsKeyword(division, 'Regulatory & Government Relations')
      || containsKeyword(division, 'People Development') 
  ) { 
    if(containsKeyword(directorate, 'Corporate Affairs') 
      || containsKeyword(directorate, 'Human Capital')){
    filteredRows.push({...row, floor: '27'});
  }
  }
  if(!department &&
    !division &&
    (containsKeyword(directorate, 'Human Capital')
    || containsKeyword(directorate, 'Corporate Affairs'))
  ){
    filteredRows.push({...row, floor: '27'});
  }
  if (
    !department &&
    !division &&
    (containsKeyword(directorate, "CEO's Office") 
      || containsKeyword(directorate, 'Finance')
      || containsKeyword(directorate, 'Enterprise Business & Corporate Affairs') 
      || containsKeyword(directorate, 'IT Digital')
      || containsKeyword(directorate, 'Commercial - Consumer') 
      || containsKeyword(directorate, 'Commercial - Home & Convergence'))
  ) { 
    filteredRows.push({...row, floor: '28'});
  }
if (
  containsKeyword(department, 'Fiber & InBuilding Management')
  || containsKeyword(department, 'Finance Business Partner & Budgeting')
  || containsKeyword(department, 'Corporate Finance & Treasury')
  || containsKeyword(department, 'System & Enabler')
  || containsKeyword(department, 'Power Management')
  || containsKeyword(department, 'Vendor Management')
  || containsKeyword(department, 'Tower Operation')
  || containsKeyword(department, 'Category Management')
  || containsKeyword(department, 'Program Portfolio Management')
  || containsKeyword(department, 'Fiber & InBuilding Management')
  || containsKeyword(department, 'Business Process Management - Non Commercial')
  || containsKeyword(department, 'Business Process Management - Commercial')
  || containsKeyword(department, 'General Procurement')
  || containsKeyword(department, 'Technology Procurement')
  || containsKeyword(department, 'Strategic Partnership')
  || containsKeyword(department, 'Strategic Program Management')
  || containsKeyword(department, 'Partnerships and M&A 1')
  || containsKeyword(division, 'Procurement')
  || containsKeyword(division, 'Finance Business Control')
  || containsKeyword(division, 'Contract Management')
  || containsKeyword(division, 'Finance')  
  || containsKeyword(division, 'Transformation Office')
  || containsKeyword(division, 'Strategic Partnership')
) { 
  if( containsKeyword(directorate, 'Finance')|| containsKeyword(directorate,"CEO's Office")
  || containsKeyword(directorate, 'Commercial - Home & Convergence')){
  filteredRows.push({...row, floor: '29'});
}
}
if (
  containsKeyword(department, 'Corporate Collection')
  || containsKeyword(department, 'Revenue Accounting')
  || containsKeyword(department, 'Account Receivable')
  || containsKeyword(department, 'Financial Operations')
  || containsKeyword(department, 'Financial Reporting')
  || containsKeyword(department, 'Revenue Settlement & New Business Accounting')
  || containsKeyword(department, 'Taxation')
  || containsKeyword(department, 'Financial Planning & Analysis')
  || containsKeyword(department, 'Revenue Settlement & New Business Accounting')
  || containsKeyword(department, 'Asset Accounting')
  || containsKeyword(division, 'Financial Accounting')
  || containsKeyword(division, 'Finance')
) { 
  if (containsKeyword(directorate, 'Finance')){
filteredRows.push({...row, floor: '30'});
}
}
if (
  containsKeyword(department, 'Premium Marketing Communication')
  || containsKeyword(department,'Premium Customer Experience')
  || containsKeyword(department,'Trade & Channel Jabo')
  || containsKeyword(department,'Direct Channel Region Jabodetabek')
  || containsKeyword(department,'Premium Product Management')
  || containsKeyword(department,'Home Marketing')
  || containsKeyword(department,'Home Product')
  || containsKeyword(department,'Digital Partnership & Operations')
  || containsKeyword(department,'Service & Compliance')
  || containsKeyword(department,'Home Business Customer Experience Strategy & Touchpoint')
  || containsKeyword(department,'Home Billing Service Excellence')
  || containsKeyword(department,'Home Business Operations')
  || containsKeyword(department,'Home Funnel Management')
  || containsKeyword(department,'Sales Jabo')
  || containsKeyword(department,'Sales Program')
  || containsKeyword(department,'Digital Partnership')
  || containsKeyword(division, 'Premium Segment')
  || containsKeyword(division,'Home Product Marketing')
  || containsKeyword(division,'Region Jabodetabek')
  || containsKeyword(division,'Direct Channel Management')
  || containsKeyword(division,'Digital Partnership')
) { 
  if(containsKeyword(directorate, 'Commercial - Marketing')
  || containsKeyword(directorate, 'Home Business')
  || containsKeyword(directorate, 'Commercial - Go To Market (GTM)')
  || containsKeyword(directorate, 'Commercial Consumer')
  || containsKeyword(directorate, 'Commercial - Home & Convergence')){
filteredRows.push({...row, floor: '31'});
}
}
if (
  containsKeyword(department, 'Government & Public Sector 2')
  || containsKeyword(department, 'Banking & Financial Services')
  || containsKeyword(department, 'Medium Enterprise Jabo & West')
  || containsKeyword(department, 'AI Solution')
  || containsKeyword(department, 'Indirect Sales Account')
  || containsKeyword(department, 'Solution Architect Strategic Account')
  || containsKeyword(department, 'Medium Enterprise Central & East')
  || containsKeyword(department, 'Solution Architect Strategic Account')
  || containsKeyword(department, 'Bid Management & Business Intelligence')
  || containsKeyword(department, 'Data Governance & Architect')
  || containsKeyword(department, 'Government & Public Sector')
  || containsKeyword(department, 'Data Operations & Project')
  || containsKeyword(department, 'Enterprise Product Partnership')
  || containsKeyword(department, 'Data Enabler & Delivery')
  || containsKeyword(department, 'Mining & Energy')
  || containsKeyword(department, 'TAM Enterprise Account')
  || containsKeyword(department, 'Infrastructure Management')
  || containsKeyword(department, 'Internet of Things')
  || containsKeyword(department, 'Data Engineering & Integration')
  || containsKeyword(department, 'Business & Performance Management')
  || containsKeyword(department, 'TAM Strategic Account')
  || containsKeyword(division, 'National & Strategic Enterprise Account')
  || containsKeyword(division, 'Regional Enterprise Account')
  || containsKeyword(division, 'Wholesale and Reseller')
  || containsKeyword(division, 'Applied Analytics')
  || containsKeyword(division, 'Solution & Tech Acct Management')
  || containsKeyword(division, 'Data Governance & Architect')
  || containsKeyword(division, 'National & Strategic Enterprise Account')
  || containsKeyword(division, 'Wholesale and Reseller')
  || containsKeyword(division, 'Data Engineering & Development')
) { 
  if(containsKeyword(directorate, 'Enterprise Business') 
    || containsKeyword(directorate, 'Strategy & Analytics')){
  filteredRows.push({...row, floor: '32'});}
}
if (
  containsKeyword(department, 'Execution Assurance')
  || containsKeyword(department, 'Geo Analytics & Strategy')
  || containsKeyword(department, 'Analytics Centre of Excellence')
  || containsKeyword(department, 'Project & GTM')
  || containsKeyword(department, 'Strategy & Analytics')
  || containsKeyword(department, 'Business Review & Performance Management')
  || containsKeyword(department, 'CVM Data Science & Analytics')
  || containsKeyword(department, 'Omnichannel Operations & Capability')
  || containsKeyword(department, 'Portfolio Management')
  || containsKeyword(department, 'Products & Segments Analytics')
  || containsKeyword(department, 'Trade and Network Analytics')
  || containsKeyword(department, 'Market Knowledge & Insight')
  || containsKeyword(department, 'CVM Growth & Loyalty')
  || containsKeyword(department, 'Corporate Strategy')
  || containsKeyword(department, 'Customer Experience Management')
  || containsKeyword(department, 'Customer Experience Incident Management')
  || containsKeyword(department, 'CVM Commercial Mass & Loyalty')
  || containsKeyword(department, 'CVM Commercial New Revenue')
  || containsKeyword(division, 'Commercial GTM')
  || containsKeyword(division, 'Customer Value & Experience Management')
  || containsKeyword(division, 'Applied Analytics')
  || containsKeyword(division, 'Commerce Budget Planning & Gov.')
  || containsKeyword(division, 'Business Analysis & Insights')
  || containsKeyword(division, 'Customer Value & Experience Management')
  || containsKeyword(division, 'Portfolio Management')
  || containsKeyword(division, 'Business Review & Performance Management')
  || containsKeyword(division, 'Corporate Strategy')
) { 
  if(containsKeyword(directorate, 'Commercial - Go To Market (GTM)')
    || containsKeyword(directorate, 'Strategy & Analytics') || containsKeyword(directorate, 'Commercial - Consumer')
    || containsKeyword(directorate, 'Commercial - Marketing')){
  filteredRows.push({...row, floor: '33'});
  }
}
if (
  containsKeyword(department, 'Channel Policy & Audit')
  || containsKeyword(department, 'Channel Strategy & Operations')
  || containsKeyword(department, 'Convergence Direct Sales')
  || containsKeyword(department, 'Market Monitoring')
  || containsKeyword(department, 'Retail Proposition')
  || containsKeyword(department, 'Brand & Communications')
  || containsKeyword(department, 'Omnichannel Operations & Capability')
  || containsKeyword(department, 'Youth Marketing Communication')
  || containsKeyword(department, 'RO & Player Program Management')
  || containsKeyword(department, 'MoChan Physical Channel')
  || containsKeyword(department, 'Retail Proposition')
  || containsKeyword(department, 'Trade Marketing')
  || containsKeyword(department, 'Consumer Propositions')
  || containsKeyword(department, 'Digital Content & Customer Journey & Touchpoints')
  || containsKeyword(department, 'Youth Touchpoints Management')
  || containsKeyword(department, 'CVM Data Science & Analytics')
  || containsKeyword(department, 'Customer Experience Incident Management')
  || containsKeyword(division, 'Indirect Channel Management')
  || containsKeyword(division, 'Youth Segment')
  || containsKeyword(division, 'Digital Channel Touchpoint')
  || containsKeyword(division, 'Mass Segment')
  || containsKeyword(division, 'Customer Value & Experience Management')
  || containsKeyword(division, 'Youth Marketing Communication')
) { 
  if(containsKeyword(directorate, 'Commercial - Consumer') || containsKeyword(directorate, 'Commercial - Marketing')){
  filteredRows.push({...row, floor: '35'});
  }
}
}).on('end', () => {
    console.log('Proses penyaringan selesai.');
    filteredRows.sort((a, b) => {
      const floorOrder = ['11', '12', '16', '17', '18', '19', '26', '27', '28', '29', '30', '31', '32', '33', '35'];
      const aValue = floorOrder.indexOf(a.floor)!== -1? floorOrder.indexOf(a.floor) : Infinity;
      const bValue = floorOrder.indexOf(b.floor)!== -1? floorOrder.indexOf(b.floor) : Infinity;
      return aValue - bValue;
    });

    csvWriter.writeRecords(filteredRows)
      .then(() => console.log('Data telah dituliskan ke file CSV!'))
      .catch((err) => console.error(err));
  });
  
