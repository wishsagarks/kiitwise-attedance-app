import React from "react";
import './login.css'
import { NavLink } from "react-router-dom";

export const Login = (props) => {

    return(
        <>
<section id="advertisers" class="advertisers-service-sec pt-5 pb-5">
  <div class="container">
    <div class="row">
      <div class="section-header text-center">
        <h2 class="fw-bold fs-1">
          <span class="b-class-secondary">Authentication</span>
          <p>KIITwise: Smart attendance management for KIIT, powered by SAP</p>
        </h2>
      </div>
    </div>
    <div class="row mt-5 mt-md-4 row-cols-1 row-cols-sm-1 row-cols-md-3 justify-content-center" style={{display:'flex'}}>
      <div class="col" >
        <div class="service-card">
      
          <h3>Login for teachers</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Quisquam consequatur necessitatibus eaque.
          </p>
        </div>
      </div>
      <div class="col">
        <div class="service-card">
          <h3>Login for students</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Quisquam consequatur necessitatibus eaque.
          </p>
        </div>
      </div>
      </div>
      </div>
</section>
        </>
    )}