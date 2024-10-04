import bg from "../public/bg.mp4";
import "./index.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
function Login() {
  return (
    <>
      <video autoPlay loop muted playsInline className="background-video">
        <source src={bg} type="video/mp4" />
      </video>
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
      </div>
    </>
  );
}

export default Login;
