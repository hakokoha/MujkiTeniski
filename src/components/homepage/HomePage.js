import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import styles from "./HomePage.module.css";

class HomePage extends Component {
  render() {
    const { auth, tshirts } = this.props;
    console.log("props", this.props);
    console.log("tshirts", tshirts);
    let tshirtsToDisplay = null;
    if (tshirts) {
      tshirtsToDisplay = tshirts.filter(
        (tshirt) => tshirt.id[tshirt.id.length - 1] === "M"
      );
    }

    return (
      <div className={styles.Items}>
        {tshirtsToDisplay &&
          tshirtsToDisplay.map((tshirt) => {
            return (
              <div className={styles.Item} key={tshirt.id}>
                <Link
                  to={"/tshirts/" + tshirt.id}
                  className={styles.ImgContainer}
                >
                  <img src={tshirt.imgUrl} className={styles.ItemPicture} />
                </Link>
                <Link
                  to={"/tshirts/" + tshirt.id}
                  className={styles.NameContainer}
                >
                  <p className={styles.ItemName}>{tshirt.name}</p>
                </Link>
                <p className={styles.ItemPrice}>{tshirt.price}лв</p>
                <div className={styles.RatingsAndSold}>
                  <FontAwesomeIcon icon={faStar} className={styles.Star} />
                  4.5
                  <p></p>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("redux bazata", state);
  return {
    auth: state.firebase.auth,
    tshirts: state.firestore.ordered.tshirts,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "tshirts" }])
)(HomePage);
