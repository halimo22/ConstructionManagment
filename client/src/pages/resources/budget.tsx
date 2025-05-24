import React from 'react';
import { useQuery } from '@tanstack/react-query';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, CreditCard, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, calculatePercentage } from '@/lib/utils';
import ProgressBar from '@/components/ui/progress-bar';
import {
  Chart,
  ChartTooltip,
  ChartContainer,
  ChartPie,
  ChartArcSeries,
  ChartArc,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart";

const Budget: React.FC = () => {
  // Fetch projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  if (isLoading) {
    return (
      <AppLayout title="Budget" subtitle="Financial management and budget tracking">
        <div className="animate-pulse">
          <div className="mb-6 flex justify-end">
            <div className="h-10 w-40 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-lg shadow"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="h-80 bg-white rounded-lg shadow"></div>
            <div className="h-80 bg-white rounded-lg shadow"></div>
          </div>
          <div className="bg-white h-96 rounded-lg shadow"></div>
        </div>
      </AppLayout>
    );
  }

  // Calculate budget metrics
  const totalBudget = projects?.reduce((acc: number, project: any) => acc + project.budget, 0) || 0;
  const totalSpent = projects?.reduce((acc: number, project: any) => acc + project.spent, 0) || 0;
  const totalRemaining = totalBudget - totalSpent;
  const spentPercentage = calculatePercentage(totalSpent, totalBudget);

  // Prepare data for pie chart
  const pieData = projects?.map((project: any) => ({
    name: project.name,
    value: project.budget,
    color: `hsl(var(--chart-${(project.id % 5) + 1}))`
  })) || [];

  // Sort projects by budget usage percentage (highest first)
  const sortedProjects = [...(projects || [])].sort((a, b) => {
    const aPercentage = (a.spent / a.budget) * 100;
    const bPercentage = (b.spent / b.budget) * 100;
    return bPercentage - aPercentage;
  });

  return (
    <AppLayout title="Budget" subtitle="Financial management and budget tracking">
      <div className="mb-6 flex justify-end">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Budget Report
        </Button>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-primary-100 rounded-md p-3 mr-4">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Budget</p>
                <h3 className="text-2xl font-semibold text-gray-900">{formatCurrency(totalBudget)}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-amber-100 rounded-md p-3 mr-4">
                <CreditCard className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Spent</p>
                <h3 className="text-2xl font-semibold text-gray-900">{formatCurrency(totalSpent)}</h3>
                <p className="text-sm text-gray-500">{spentPercentage}% of budget</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-md p-3 mr-4">
                <ArrowUpRight className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Remaining Budget</p>
                <h3 className="text-2xl font-semibold text-gray-900">{formatCurrency(totalRemaining)}</h3>
                <p className="text-sm text-gray-500">{100 - spentPercentage}% remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Budget Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <Chart className="h-full w-full">
                <ChartContainer className="h-full w-full">
                  <ChartPie className="h-full w-full">
                    <ChartArcSeries>
                      {pieData.map((data, i) => (
                        <ChartArc
                          key={i}
                          value={data.value}
                          color={data.color}
                        />
                      ))}
                    </ChartArcSeries>
                  </ChartPie>
                  <ChartTooltip />
                </ChartContainer>
              </Chart>
            </div>
            <ChartLegend className="mt-4 flex flex-wrap gap-4">
              {pieData.map((data, i) => (
                <ChartLegendItem key={i} color={data.color} name={data.name} />
              ))}
            </ChartLegend>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sortedProjects.slice(0, 5).map((project: any) => {
                const spentPercentage = calculatePercentage(project.spent, project.budget);
                let color: 'primary' | 'amber' | 'red' = 'primary';
                
                if (spentPercentage >= 90) {
                  color = 'red';
                } else if (spentPercentage >= 70) {
                  color = 'amber';
                }

                return (
                  <div key={project.id}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">{project.name}</h4>
                        <p className="text-xs text-gray-500">{formatCurrency(project.spent)} of {formatCurrency(project.budget)}</p>
                      </div>
                      <div className="text-sm font-semibold">
                        {spentPercentage}%
                      </div>
                    </div>
                    <ProgressBar 
                      value={spentPercentage} 
                      color={color}
                      showPercentage={false}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Budget Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Budget Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects?.map((project: any) => {
                  const spentPercentage = calculatePercentage(project.spent, project.budget);
                  const remaining = project.budget - project.spent;
                  
                  let statusText = "On Budget";
                  let statusColor = "text-green-600";
                  let statusIcon = <ArrowUpRight className="h-4 w-4 text-green-600" />;
                  
                  if (spentPercentage >= 90) {
                    statusText = "Critical";
                    statusColor = "text-red-600";
                    statusIcon = <ArrowDownRight className="h-4 w-4 text-red-600" />;
                  } else if (spentPercentage >= 75) {
                    statusText = "Warning";
                    statusColor = "text-amber-600";
                    statusIcon = <ArrowDownRight className="h-4 w-4 text-amber-600" />;
                  }

                  return (
                    <tr key={project.id}>
                      <td className="py-3 px-4 text-sm">
                        <div className="font-medium text-gray-900">{project.name}</div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">{formatCurrency(project.budget)}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{formatCurrency(project.spent)}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{formatCurrency(remaining)}</td>
                      <td className="py-3 px-4 text-sm">
                        <div className={`flex items-center ${statusColor}`}>
                          {statusIcon}
                          <span className="ml-1">{statusText}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <div className="w-32">
                          <ProgressBar 
                            value={spentPercentage}
                            color={spentPercentage >= 90 ? 'red' : spentPercentage >= 75 ? 'amber' : 'primary'}
                            size="sm"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Budget;
