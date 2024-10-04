import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import timnestamp from "unix-timestamp";
function Locationform(props) {
  var myarray;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [passes, setPasses] = useState([]);
  const [targetlocation, setTargetlocation] = useState({
    lat: props.values?.userlatitude ? props.values.userlatitude : "",
    long: props.values?.userlongitude ? props.values.userlongitude : "",
  });

  function handlechange(e) {
    setTargetlocation({
      ...targetlocation,
      [e.target.name]: e.target.value,
    });
  }
  async function handlesubmit(e) {
    e.preventDefault();
    var response = await axios.get(
      "http://localhost:5000/n2yo/rest/v1/satellite/radiopasses/39084/" +
        targetlocation.lat +
        "/" +
        targetlocation.long +
        "/0/10/78/&apiKey=FKD8P9-RSUKDY-L3M9N8-5CG4"
    );
    if (response.data) {
      handleShow();
      setPasses(response.data.passes);
    }
  }

  function handleClick(pass) {
    var date = new Date(pass.startUTC * 1000).toISOString().slice(0, 10);

    async function senddata() {
      const res = await axios.post("http://localhost:3000/requestdata", {
        date: date,
        lat: targetlocation.lat,
        long: targetlocation.long,
        user: sessionStorage.getItem("user"),
      });
    }
    senddata();
  }

  return (
    <>
      <div className="formdiv">
        <h2>Target Location</h2>
        <Form className="locationform" onSubmit={handlesubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              value={targetlocation.lat}
              onChange={handlechange}
              name="lat"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="text"
              value={targetlocation.long}
              onChange={handlechange}
              name="long"
            />
          </Form.Group>

          <Button variant="primary submit-btn" type="submit">
            Check Passes
          </Button>
        </Form>
        <Modal show={show} onHide={handleClose} className="popup" size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Satellite Passing Date and Time</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {passes.map((pass) => {
                  return (
                    <>
                      <tr>
                        <td>
                          {
                            (myarray = String(
                              timnestamp.toDate(pass.startUTC)
                            ).split(" ")[1])
                          }
                        </td>
                        <td>
                          {
                            (myarray = String(
                              timnestamp.toDate(pass.startUTC)
                            ).split(" ")[2])
                          }
                        </td>
                        <td>
                          {" "}
                          {
                            (myarray = String(
                              timnestamp.toDate(pass.startUTC)
                            ).split(" ")[4])
                          }
                        </td>
                        <td>
                          {" "}
                          {
                            (myarray = String(
                              timnestamp.toDate(pass.endUTC)
                            ).split(" ")[4])
                          }
                        </td>
                        <td>
                          <Button onClick={() => handleClick(pass)}>
                            Request data
                          </Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Locationform;
