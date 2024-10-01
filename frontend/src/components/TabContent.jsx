import DisplayGoals from './DisplayGoals';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';

const TabContent = ({ category }) => {
  return (
    <div
      className="p-4 rounded-lg md:p-8"
    >
        <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-white">
          { category }
        </h2>
        <div className="flex flex-col md:flex-row justify-around items-center md:items-start gap-5">
          <DisplayGoals
            category={ category }
            timeframe='Shorterm'
            
          />
          <DisplayGoals
            category={ category }
            timeframe='Longterm'
          />
        </div>
    </div>
  )
}

export const PersonalTab = () => {
  return (
    <TabContent category='Personal'/>
  )
}

export const FinanceTab = () => {
  return (
    <TabContent category='Finance'/>
  )
}

export const CareerTab = () => {
  return (
    <TabContent category='Career'/>
  )
}

