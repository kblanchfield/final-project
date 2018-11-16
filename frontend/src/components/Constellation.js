import React from 'react'
import PropTypes from "prop-types"

const Constellation = (props) => {

    return (
      <div className="constellation">
        <img src={"./images/" + props.constellation + ".png"} alt={props.constellation} />
      </div>
    )

  }

Constellation.propTypes = {
  constellation: PropTypes.string
}

export default Constellation
