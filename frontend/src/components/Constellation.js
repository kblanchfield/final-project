import React from 'react';

const Constellation = (props) => {

    return (
      <div className="constellation">
        <img src={"./images/" + props.constellation + ".png"} alt={props.constellation} />
      </div>
    );

  }

export default Constellation;
