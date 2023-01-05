import { Modal, } from "@lipihipi/ec-ui";
import React from "react";

const Explanation = (props: any) => {
  return (
    <Modal isOpen={props.isOpen} heightDefault={true} onRequestClose={props.onRequestClose}>
      <div className="row explation-test">
        <div className="col-sm-7">
          <div className="primary-page-header mb-3">
            <div className="wrap">
            <h3>CAT Rank Booster</h3>
          </div>
            <div className="attempt-info wrong">Wrong Attempt</div>
            {/* <div className="attempt-info correct">Correct Attempt</div> */}
          </div>

          <div className="section-info">
            <strong>Section:</strong> Data Intepretation and Logical Reasonning
          </div>

          <ul className="test-duration-info">
            <li>Easy</li>
            <li>3min 3sec</li>
            <li>Topic Name</li>
          </ul>

          <div className="common-data-view">
            <h3>Common Data</h3>
            <p>A tetrahedron was cut from the corner of the cuboid shown above, with three of its vertices at the midpoints of three edgers of the cuboid. If tetrahedrons of the same size are cut from the remaining seven corners of the cuboid, how many faces will the resulting solid have? A tetrahedron was cut from the corner of the cuboid shown above, with three of its vertices at the midpoints of three edgers of the cuboid. If tetrahedrons of the same size are cut from the remaining seven corners of the cuboid, how many faces will the resulting solid have? A tetrahedron was cut from the corner of the cuboid shown above, with three of its vertices at the midpoints of three edgers of the cuboid. If tetrahedrons of the same size are cut from the remaining seven corners of the cuboid, how many faces will the resulting solid have?</p>
          </div>

          <div className="question-result-view">
            <h3><strong>Question 3:</strong> A tetrahedron was cut from the corner of the cuboid shown above, with three of its vertices at the midpoints of three edgers of the cuboid. If tetrahedrons of the same size are cut from the remaining seven corners of the cuboid, how many faces will the resulting solid have?</h3>

            <div className="custom-radio-group">
              <div className="radio-button">
                <label>
                  <input type="radio" name="a" />
                  <span>Option 1</span>
                </label>
              </div>

              <div className="radio-button checked">
                <label>
                  <input type="radio" name="a" />
                  <span>Option 2</span>
                </label>
              </div>

              <div className="radio-button">
                <label>
                  <input type="radio" name="a" />
                  <span>Option 3</span>
                </label>
              </div>

              <div className="radio-button">
                <label>
                  <input type="radio" name="a" />
                  <span>Option 4</span>
                </label>
              </div>
            </div>

            <div className="correct-answer">
              <strong>Correct Answer:</strong> Option 1
            </div>

            <div className="button-group">
              <a href="javascript:void(0)" className="outline">Previous</a>
              <a href="javascript:void(0)">Next</a>
            </div>
          </div>
        </div>
        <div className="col-sm-5">
          <div className="common-data-view">
            <h3>Explanation</h3>
            <p>A tetrahedron was cut from the corner of the cuboid shown above, with three of its vertices at the midpoints of three edgers of the cuboid. If tetrahedrons of the same size are cut from the remaining seven corners of the cuboid, how many faces will the resulting solid have? A tetrahedron was cut from the corner of the cuboid shown above, with three of its vertices at the midpoints of three edgers of the cuboid. If tetrahedrons of the same size are cut from the remaining seven corners of the cuboid, how many faces will the resulting solid have? A tetrahedron was cut from the corner of the cuboid shown above, with three of its vertices at the midpoints of three edgers of the cuboid. If tetrahedrons of the same size are cut from the remaining seven corners of the cuboid, how many faces will the resulting solid have?</p>
          </div>
        </div>
      </div>

    </Modal>
  );
};


export default Explanation;