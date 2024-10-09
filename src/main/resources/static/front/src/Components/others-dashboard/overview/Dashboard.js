import React from 'react';
import AccessTypeList from '../../../public/assets/js/admin-access-type-list-script.js';

const Dashboard = () => {
  return (
    <div className="page-wrapper mdc-toolbar-fixed-adjust">
      <main className="content-wrapper">
        <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
            {/* Card 1 */}
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

            {/* Card 2 */}
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

            {/* Card 3 */}
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

            {/* Card 4 */}
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

            {/* Revenue Table */}
            <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-12">
              <div className="mdc-card">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mb-0">Revenue by location</h4>
                  <div>
                    <i className="material-icons refresh-icon">refresh</i>
                    <i className="material-icons options-icon ml-2">more_vert</i>
                  </div>
                </div>
                <div className="d-block d-sm-flex justify-content-between align-items-center">
                  <h5 className="card-sub-title mb-2 mb-sm-0">Sales performance revenue based by country</h5>
                  <div className="menu-button-container">
                    <button className="mdc-button mdc-menu-button mdc-button--raised button-box-shadow tx-12 text-dark bg-white font-weight-light">
                      Last 7 days
                      <i className="material-icons">arrow_drop_down</i>
                    </button>
                    <div className="mdc-menu mdc-menu-surface" tabIndex="-1">
                      <ul className="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical">
                        <li className="mdc-list-item" role="menuitem">Back</li>
                        <li className="mdc-list-item" role="menuitem">Forward</li>
                        <li className="mdc-list-item" role="menuitem">Reload</li>
                        <li className="mdc-list-divider"></li>
                        <li className="mdc-list-item" role="menuitem">Save As..</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mdc-layout-grid__inner mt-2">
                  <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
                    <div className="table-responsive">
                      <table className="table dashboard-table">
                        <tbody>
                          {/* Table rows */}
                          <tr>
                            <td><span className="flag-icon-container"><i className="flag-icon flag-icon-us mr-2"></i></span>United States</td>
                            <td>$1,671.10</td>
                            <td className="font-weight-medium">39%</td>
                          </tr>
                          {/* Add similar rows for other countries */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
                    <div id="revenue-map" className="revenue-world-map"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Cards */}
            <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6-desktop mdc-layout-grid__cell--span-4-tablet">
              <div className="mdc-card bg-success text-white">
                <div className="d-flex justify-content-between">
                  <h3 className="font-weight-normal">Impressions</h3>
                  <i className="material-icons options-icon text-white">more_vert</i>
                </div>
                <div className="mdc-layout-grid__inner align-items-center">
                  <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-4-desktop mdc-layout-grid__cell--span-3-tablet mdc-layout-grid__cell--span-2-phone">
                    <div>
                      <h5 className="font-weight-normal mt-2">Customers 58.39k</h5>
                      <h2 className="font-weight-normal mt-3 mb-0">636,757K</h2>
                    </div>
                  </div>
                  <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-8-desktop mdc-layout-grid__cell--span-5-tablet mdc-layout-grid__cell--span-2-phone">
                    <canvas id="impressions-chart" height="80"></canvas>
                  </div>
                </div>
              </div>
            </div>

            {/* Similarly, add Traffic and other cards */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
            <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6-desktop">
              <span className="text-center text-sm-left d-block d-sm-inline-block tx-14">Optimizer Tool</span>
            </div>
            <div className="mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-6-desktop d-flex justify-content-end">
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center tx-14">Manage your stakeholders</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
