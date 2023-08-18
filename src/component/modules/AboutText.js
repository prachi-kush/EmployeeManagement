import React from 'react';

const AboutText = () => {
  const aboutText = `
    Our Employee Management System is a comprehensive and user-friendly platform designed to streamline and simplify all aspects of 
    managing your workforce. Whether you are a small startup or a large enterprise, our system is equipped to handle all your 
    employee-related tasks efficiently.
   
    Key Features:
    - Employee Profiles: Maintain detailed profiles for each employee, including personal information, contact details, and employment 
      history.
   
    - Attendance Tracking: Keep track of employee attendance and working hours, ensuring accurate records and payroll management.
   
    - Leave Management: Our system allows employees to request leave, and managers can easily approve or decline requests, ensuring 
      smooth workflow management.
   
    - Performance Evaluation: Conduct regular performance evaluations, set goals, and provide feedback to help employees grow 
      professionally.
   
    - Document Management: Store and manage important employee documents securely, reducing paperwork and enhancing organization.
   
    - Task Assignment: Assign tasks to employees, monitor progress, and ensure timely completion.
   
    - Analytics and Reporting: Generate insightful reports and analytics on various HR metrics to make data-driven decisions.
   
    Our mission is to empower businesses with an intuitive and efficient employee management solution that saves time, reduces 
    administrative burden, and fosters a positive work environment.
   
    Join us on this journey of simplifying HR operations and improving overall employee satisfaction. We are committed to delivering 
    excellence and continuously enhancing our system to meet your evolving needs.
   
    Get started with our Employee Management System today and experience the power of streamlined HR processes!
   
    If you have any questions or need assistance, feel free to reach out to our dedicated support team. We look forward to serving you!
   
    Happy Managing!
  `;

  const titleStyle = {
    fontSize: '36px',
    color: '#3d88f5',
    marginBottom: '20px',
    textAlign: 'center',
    textTransform: 'uppercase',
  };

  const contentStyle = {
    fontSize: '18px',
    color: '#333',
    lineHeight: '1.6',
    overflowWrap: 'break-word',
  };

  const bulletPointStyle = {
    color: '#3d88f5',
    fontWeight: 'bold',
  };

  return (
    <div>
      <div className='m-5 p-5' style={{ marginRight: '60%' }}>
        <h2 style={titleStyle}>Welcome to our Employee Management System!</h2>
        <pre style={contentStyle}>
          {aboutText.split('\n').map((line, index) => (
            <span key={index}>
              {line.startsWith('- ') ? (
                <span style={bulletPointStyle}>{line}</span>
              ) : (
                line
              )}
              <br />
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default AboutText;
