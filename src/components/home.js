import React from "react";


export const Home = () => {
  return (
    <div>
      <div className='wrap'>
        <div className='content'>
          <h1 className='my-h1-landing'> Trading Licence</h1>
            <p><b>If you trade without a licence, you can be fined up to £1,000.</b></p>
            <h1>About us:</h1>
            <h4>
              The charge for an application is £75. If you get a licence, 
              there is also a fee for every week that the licence runs:
              Local traders (small traders based in Newham) - £25 per week. 
              National traders - £36 per week.
            </h4>
        </div>
      </div>

      <svg
        className='wave'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill='#fff'
          fillOpacity='1'
          d='M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,192C672,192,768,160,864,144C960,128,1056,128,1152,154.7C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
        ></path>
      </svg>

      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='black'
          fillOpacity='1'
          d='M0,32L48,37.3C96,43,192,53,288,90.7C384,128,480,192,576,181.3C672,171,768,85,864,90.7C960,96,1056,192,1152,192C1248,192,1344,96,1392,48L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
        ></path>
      </svg>
    </div>
  );
};

export default Home;