import Head from 'next/head'
import { useState } from 'react';
// import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import NodeInfo from './components/node-info'
import ProjectsInfo from './components/projects-info';
import JobsInfo from './components/jobs-info';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Spider Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-CuOF+2SnTUfTwSZjCXf01h7uYhfOBuxIhGKPbfEJ3+FqH/s6cIFN9bGr1HmAg4fQ" crossOrigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css2?family=Material+Icons"
          rel="stylesheet"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-popRpmFF9JQgExhfw5tZT4I9/CI5e2QcuUZPOVXb1m7qUmeR2b50u+YFEYe1wgzy" crossOrigin="anonymous"></script>
      </Head>
      <div className="container-fluid  px-1">
        <div className='row justify-content-center  px-2   no-gutters'>
          <div className='col-md-4  col-sm-12'>
            <div className='row justify-content-center  px-2   no-gutter'>
              <div className="p-3 mt-3 col-md-12  col-sm-12">
                <NodeInfo />
              </div>
            </div>
            <div className='row justify-content-center  px-2   no-gutter'>
              <div className="p-3 mt-3 col-md-12 col-sm-12">
                <ProjectsInfo />
              </div>
            </div>
          </div>
          <div className="col-md-8 col-sm-12">       
              <JobsInfo />
          </div>
        </div>
      </div>
    </div>
  )
}
