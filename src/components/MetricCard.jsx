// components/DashboardCards.js
import React from 'react';

const MetricCard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Total Earning Card */}
      <div className="flex-1 bg-[#2D2D2D] rounded-lg p-6 flex items-center justify-between shadow-md">
        <div>
          <p className="text-gray-400 text-sm font-normal">Total Earning</p>
          <h2 className="text-[#FFF] text-3xl font-bold mt-1">$682.5</h2>
        </div>
        <div className="bg-[#FFF] rounded-full p-3 flex items-center justify-center w-12 h-12">
          {/* You can replace this with an actual chart icon from a library like Heroicons */}
         <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
  <g clipPath="url(#clip0_0_589)">
    <rect width="29.5692" height="29.5692" transform="translate(0.958008 0.346191)" fill="#"/>
    <path d="M8.84316 11.681H9.08957C10.0382 11.681 10.8144 12.4571 10.8144 13.4058V22.0302C10.8144 22.9789 10.0382 23.755 9.08957 23.755H8.84316C7.89448 23.755 7.11829 22.9789 7.11829 22.0302V13.4058C7.11829 12.4571 7.89448 11.681 8.84316 11.681ZM15.7426 6.50635C16.6913 6.50635 17.4675 7.28254 17.4675 8.23122V22.0302C17.4675 22.9789 16.6913 23.755 15.7426 23.755C14.794 23.755 14.0178 22.9789 14.0178 22.0302V8.23122C14.0178 7.28254 14.794 6.50635 15.7426 6.50635ZM22.6421 16.3627C23.5908 16.3627 24.367 17.1389 24.367 18.0876V22.0302C24.367 22.9789 23.5908 23.755 22.6421 23.755C21.6934 23.755 20.9172 22.9789 20.9172 22.0302V18.0876C20.9172 17.1389 21.6934 16.3627 22.6421 16.3627Z" fill="#121212"/>
  </g>
  <defs>
    <clipPath id="clip0_0_589">
      <rect width="29.5692" height="29.5692" fill="white" transform="translate(0.958008 0.346191)"/>
    </clipPath>
  </defs>
</svg>
        </div>
      </div>

      {/* Total User Card */}
      <div className="flex-1 bg-[#2D2D2D] rounded-lg p-6 flex items-center justify-between shadow-md">
        <div>
          <p className="text-gray-400 text-sm">Total User</p>
          <h2 className=" text-3xl font-bold mt-1">68</h2>
        </div>
        <div className="bg-[#FFF] rounded-full p-3 flex items-center justify-center w-12 h-12">
          {/* You can replace this with an actual user icon from a library like Heroicons */}
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18" fill="none">
  <path fillRule="evenodd" clipRule="evenodd" d="M16.6959 10.187C18.135 11.1639 19.1434 12.4874 19.1434 14.2521V17.4034H22.2946C22.8724 17.4034 23.3451 16.9307 23.3451 16.353V14.2521C23.3451 11.9622 19.5951 10.6072 16.6959 10.187Z" fill="#121212"/>
  <path d="M8.63929 9.00001C10.9598 9.00001 12.841 7.11886 12.841 4.79835C12.841 2.47783 10.9598 0.59668 8.63929 0.59668C6.31877 0.59668 4.43762 2.47783 4.43762 4.79835C4.43762 7.11886 6.31877 9.00001 8.63929 9.00001Z" fill="#121212"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M14.9417 9.00001C17.2632 9.00001 19.1434 7.11977 19.1434 4.79835C19.1434 2.47693 17.2632 0.59668 14.9417 0.59668C14.448 0.59668 13.9859 0.701721 13.5447 0.848779C14.4165 1.93071 14.9417 3.30675 14.9417 4.79835C14.9417 6.28994 14.4165 7.66598 13.5447 8.74791C13.9859 8.89497 14.448 9.00001 14.9417 9.00001Z" fill="#121212"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M8.63929 10.0503C5.83468 10.0503 0.235962 11.4579 0.235962 14.252V16.3528C0.235962 16.9305 0.708649 17.4032 1.28638 17.4032H15.9922C16.5699 17.4032 17.0426 16.9305 17.0426 16.3528V14.252C17.0426 11.4579 11.4439 10.0503 8.63929 10.0503Z" fill="#121212"/>
</svg>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;