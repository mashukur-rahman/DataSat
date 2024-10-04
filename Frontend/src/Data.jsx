import Table from "react-bootstrap/Table";
import bg from "../public/bg.mp4";
import "./index.css";
import Navigator from "./Navbar";
function Data() {
  return (
    <>
      <video autoPlay loop muted playsInline className="background-video">
        <source src={bg} type="video/mp4" />
      </video>
      <Navigator />
      <Table striped bordered hover className="datatable" variant="dark">
        <thead>
          <tr>
            <th>Date</th>
            <th>Latitue</th>
            <th>Longitude</th>
            <th>Normalized Difference Vegetation Index(NDVI)</th>
            <th>Normalized Difference Water Index(NDWI)</th>
            <th>Land Surface Temparature</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-09-12</td>
            <td>23.099993844</td>
            <td>5.937578455</td>
            <td>0.235423121</td>
            <td>0.5323234</td>
            <td>303k</td>
          </tr>
          <tr>
            <td>2024-10-06</td>
            <td>23.773184</td>
            <td>90.4003584</td>
            <td>0.296224341</td>
            <td>0.234168456</td>
            <td>312k</td>
          </tr>
        </tbody>
      </Table>
      ;
    </>
  );
}

export default Data;
