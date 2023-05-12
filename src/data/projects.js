// TODO Add a couple lines about each project
const data = [
  {
    title: 'Penn Search',
    subtitle: 'CIS 553 Final Project',
    image: '/images/projects/chord.png',
    link: 'https://netdb.cis.upenn.edu/cis553projects/project2.pdf',
    date: '2022-5-1',
    desc:
    'Using C++ and the ns-3 network simulator, developed a keyword-based search engine incorporating '
    + 'a Chord overlay network using distributed hash tables for capstone Networked Systems project.',
  },
  {
    title: 'Livability Index',
    subtitle: 'CIS 550 Final Project',
    image: '/images/projects/livability.png',
    link: 'https://github.com/croot22/CIS-550-Final-Project',
    date: '2021-4-26',
    desc:
    'Developed a web application using React, Node.js, MySQL, and AWS that displays '
    + 'a livability score by zipcode while providing detailed information on home prices '
    + 'school ratings, crime statistics, and local activities.',
  },
  {
    title: 'Air Quality SMS Alerts',
    subtitle: 'Won 3rd place in 2020 MCIT Online Student Association Hackathon',
    link: 'https://devpost.com/software/air-quality-sms-alerts',
    image: '/images/projects/sms.png',
    date: '2020-08-30',
    desc:
      'Web application using Javascript that sends SMS alerts for air quality index '
      + 'levels and weather conditions using the Twilio SMS API, OpenWeatherMap Weather API '
      + 'and IQAir air quality index API.',
  },
  {
    title: 'News Summarizer',
    subtitle: 'CIT 591 Final Project.',
    link: 'https://github.com/johnhentrich/NLP-Text-Summarizer',
    image: '/images/projects/news.png',
    date: '2019-08-31',
    desc:
      'Java based news summarizer that first web scrapes the daily news '
      + 'using j-soup and then summarizes while also calculating the sentiment '
      + 'of each article using CoreNLP.',
  },
];

export default data;
