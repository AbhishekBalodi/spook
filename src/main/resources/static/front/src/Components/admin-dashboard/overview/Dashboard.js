import React, { useEffect } from 'react';
import "../../../public/assets/css/dashboard.css";
import 'chart.js'; // Assuming Chart.js is used for charts
//import AccessTypeList from '../../../public/assets/js/admin-access-type-list-script.js';
const Dashboard = () => {
  useEffect(() => {
    // Initialize charts, tables, or any other JavaScript libraries if needed
  }, []);

  return (
    <div className="page-wrapper">
      <main className="content-wrapper">
        <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
            {/* Borrowed Card */}
            <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3-desktop mdc-layout-grid__cell--span-4-tablet">
              <div className="mdc-card info-card info-card--success">
                <div className="card-inner">
                  <h5 className="card-title">Borrowed</h5>
                  <h5 className="font-weight-light pb-2 mb-1 border-bottom">$62,0076.00</h5>
                  <p className="tx-12 text-muted">48% target reached</p>
                  <div className="card-icon-wrapper">
                    <i className="material-icons">dvr</i>
                  </div>
                </div>
              </div>
            </div>

            {/* Annual Profit Card */}
            <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3-desktop mdc-layout-grid__cell--span-4-tablet">
              <div className="mdc-card info-card info-card--danger">
                <div className="card-inner">
                  <h5 className="card-title">Annual Profit</h5>
                  <h5 className="font-weight-light pb-2 mb-1 border-bottom">$1,958,104.00</h5>
                  <p className="tx-12 text-muted">55% target reached</p>
                  <div className="card-icon-wrapper">
                    <i className="material-icons">attach_money</i>
                  </div>
                </div>
              </div>
            </div>

            {/* Lead Conversion Card */}
            <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3-desktop mdc-layout-grid__cell--span-4-tablet">
              <div className="mdc-card info-card info-card--primary">
                <div className="card-inner">
                  <h5 className="card-title">Lead Conversion</h5>
                  <h5 className="font-weight-light pb-2 mb-1 border-bottom">$234,769.00</h5>
                  <p className="tx-12 text-muted">87% target reached</p>
                  <div className="card-icon-wrapper">
                    <i className="material-icons">trending_up</i>
                  </div>
                </div>
              </div>
            </div>

            {/* Average Income Card */}
            <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-3-desktop mdc-layout-grid__cell--span-4-tablet">
              <div className="mdc-card info-card info-card--info">
                <div className="card-inner">
                  <h5 className="card-title">Average Income</h5>
                  <h5 className="font-weight-light pb-2 mb-1 border-bottom">$1,200.00</h5>
                  <p className="tx-12 text-muted">87% target reached</p>
                  <div className="card-icon-wrapper">
                    <i className="material-icons">credit_card</i>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue by Location */}
            <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-12">
              <div className="mdc-card">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mb-0">Revenue by Location</h4>
                  <div>
                    <i className="material-icons refresh-icon">refresh</i>
                    <i className="material-icons options-icon ml-2">more_vert</i>
                  </div>
                </div>
                <div className="mdc-layout-grid__inner mt-2">
                  <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                    <div className="table-responsive">
                      <table className="table dashboard-table">
                        <tbody>
                          <tr><td>United States</td><td>$1,671.10</td><td>39%</td></tr>
                          <tr><td>Philippines</td><td>$1,064.75</td><td>30%</td></tr>
                          <tr><td>United Kingdom</td><td>$1,055.98</td><td>45%</td></tr>
                          <tr><td>Canada</td><td>$1,045.49</td><td>80%</td></tr>
                          <tr><td>France</td><td>$2,050.93</td><td>10%</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                    <div id="revenue-map" className="revenue-world-map">Map Placeholder</div>
                  </div>
                </div>
              </div>
            </div>

            {/* More cards... */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
            <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6-desktop">
              <span>Optimizer Tool</span>
            </div>
            <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6-desktop d-flex justify-content-end">
              <span>Manage your stakeholders</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
