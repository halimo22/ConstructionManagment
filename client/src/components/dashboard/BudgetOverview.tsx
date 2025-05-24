import React from 'react';
import { Link } from 'wouter';
import { formatCurrency, calculatePercentage } from '@/lib/utils';
import ProgressBar from '@/components/ui/progress-bar';

interface ProjectBudget {
  id: number;
  name: string;
  budget: number;
  spent: number;
  color?: 'primary' | 'secondary' | 'amber' | 'green';
}

interface BudgetOverviewProps {
  totalBudget: number;
  spentToDate: number;
  projectBudgets: ProjectBudget[];
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({
  totalBudget,
  spentToDate,
  projectBudgets = []
}) => {
  const remaining = totalBudget - spentToDate;
  const spentPercentage = calculatePercentage(spentToDate, totalBudget);
  const remainingPercentage = 100 - spentPercentage;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Budget Overview</h2>
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Total Budget</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{formatCurrency(totalBudget)}</p>
              <div className="mt-2 text-xs text-gray-500">For all active projects</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Spent to Date</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{formatCurrency(spentToDate)}</p>
              <div className="mt-2 text-xs text-gray-500">{spentPercentage}% of total budget</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Remaining</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{formatCurrency(remaining)}</p>
              <div className="mt-2 text-xs text-gray-500">{remainingPercentage}% of total budget</div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Budget Distribution by Project</h3>
            <div className="space-y-4">
              {projectBudgets.map((project) => {
                const percentage = calculatePercentage(project.budget, totalBudget);
                const spentPercentage = calculatePercentage(project.spent, project.budget);
                
                return (
                  <div key={project.id}>
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-medium text-gray-700">{project.name}</div>
                      <div className="text-sm font-medium text-gray-700">{formatCurrency(project.budget)}</div>
                    </div>
                    <ProgressBar 
                      value={spentPercentage} 
                      color={project.color || 'primary'}
                      showPercentage={false}
                    />
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <div>{percentage}% of total</div>
                      <div>{formatCurrency(project.spent)} spent</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-3">
          <div className="text-sm">
            <Link href="/resources/budget">
              <a className="font-medium text-primary-600 hover:text-primary-500">View detailed budget report</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
