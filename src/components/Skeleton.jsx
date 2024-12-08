// import React from 'react'

// const Skeleton = () => {
//   return (
//     <div className='d-flex g-2'>
//       <b-skeleton type="avatar"></b-skeleton>
//       <b-skeleton type="button"></b-skeleton>
//     </div>
//   )
// }

// export default Skeleton

import React from "react";

const SkeletonNavbar = () => {
    return (
        <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    );
};

export default SkeletonNavbar;
