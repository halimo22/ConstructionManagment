import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

const ProjectPlanning: React.FC = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Project Stages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Define the key stages for your construction projects</p>
            <ul className="space-y-2">
              <li className="text-sm bg-gray-50 p-3 rounded-md">Planning & Design</li>
              <li className="text-sm bg-gray-50 p-3 rounded-md">Permits & Approvals</li>
              <li className="text-sm bg-gray-50 p-3 rounded-md">Site Preparation</li>
              <li className="text-sm bg-gray-50 p-3 rounded-md">Foundation Work</li>
              <li className="text-sm bg-gray-50 p-3 rounded-md">Framing & Structural Work</li>
              <li className="text-sm bg-gray-50 p-3 rounded-md">MEP Installation</li>
              <li className="text-sm bg-gray-50 p-3 rounded-md">Interior Finishing</li>
              <li className="text-sm bg-gray-50 p-3 rounded-md">Exterior Finishing</li>
              <li className="text-sm bg-gray-50 p-3 rounded-md">Final Inspections</li>
              <li className="text-sm bg-gray-50 p-3 rounded-md">Project Closeout</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Planning Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Use pre-defined templates to kickstart your project planning</p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Residential Building</h4>
                  <p className="text-xs text-gray-500">For single-family homes and residential complexes</p>
                </div>
                <Button variant="outline" size="sm">Use</Button>
              </li>
              <li className="flex items-center">
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Commercial Property</h4>
                  <p className="text-xs text-gray-500">For office buildings and retail spaces</p>
                </div>
                <Button variant="outline" size="sm">Use</Button>
              </li>
              <li className="flex items-center">
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Infrastructure Project</h4>
                  <p className="text-xs text-gray-500">For roads, bridges and public facilities</p>
                </div>
                <Button variant="outline" size="sm">Use</Button>
              </li>
              <li className="flex items-center">
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Renovation</h4>
                  <p className="text-xs text-gray-500">For remodeling and renovation projects</p>
                </div>
                <Button variant="outline" size="sm">Use</Button>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Planning Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Access specialized tools for effective project planning</p>
            <ul className="space-y-3">
              <li>
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Gantt Chart Creator
                </Button>
              </li>
              <li>
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  Resource Estimator
                </Button>
              </li>
              <li>
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  Risk Assessment Tool
                </Button>
              </li>
              <li>
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  Cost Optimization
                </Button>
              </li>
              <li>
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Regulatory Checklist
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProjectPlanning;
