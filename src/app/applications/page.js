"use client";

import useRawData from "@/hooks/use-raw-data";
import {
  BarList,
  Card,
  Flex,
  Grid,
  Metric,
  Text,
  Title,
  SearchSelect,
  SearchSelectItem,
  LineChart,
} from "@tremor/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CostsCard = ({ data }) => {
  // combine data from all applications
  const costs = data.reduce((result, app) => {
    const name = app.Tags["app-name"];
    result[name] = (result[name] || 0) + parseFloat(app.Cost);
    return result;
  }, {});

  // map cost data into barlist format and sort by value
  const barData = Object.keys(costs).map((app) => ({
    name: app,
    value: costs[app],
  }));

  barData.sort((a, b) => b.value - a.value);

  // calculate total cost of applications
  const total = barData.reduce((total, entry) => total + entry.value, 0);
  return (
    <Card>
      <Title>Costs</Title>
      <Flex justifyContent="start" alignItems="baseline" className="space-x-2">
        <Metric>${Intl.NumberFormat("us").format(total).toString()}</Metric>
        <Text>Total costs</Text>
      </Flex>
      <Flex className="mt-6">
        <Text>Application</Text>
        <Text className="text-right">Costs</Text>
      </Flex>
      <BarList
        data={barData.slice(0, 5)}
        valueFormatter={(number) =>
          "$" + Intl.NumberFormat("us").format(number).toString()
        }
        className="mt-2"
      />
    </Card>
  );
};

const ConsumedCard = ({ data }) => {
  // combine data from all applications
  const costs = data.reduce((result, app) => {
    const name = app.Tags["app-name"];
    result[name] = (result[name] || 0) + parseFloat(app.ConsumedQuantity);
    return result;
  }, {});

  // map cost data into barlist format and sort by value
  const barData = Object.keys(costs).map((app) => ({
    name: app,
    value: costs[app],
  }));

  barData.sort((a, b) => b.value - a.value);

  // calculate total cost of applications
  const total = barData.reduce((total, entry) => total + entry.value, 0);
  return (
    <Card>
      <Title>Consumed Quantity</Title>
      <Flex justifyContent="start" alignItems="baseline" className="space-x-2">
        <Metric>{Intl.NumberFormat("us").format(total).toString()}</Metric>
        <Text>Total consumed</Text>
      </Flex>
      <Flex className="mt-6">
        <Text>Application</Text>
        <Text className="text-right">Consumed</Text>
      </Flex>
      <BarList
        data={barData.slice(0, 5)}
        valueFormatter={(number) =>
          Intl.NumberFormat("us").format(number).toString()
        }
        className="mt-2"
      />
    </Card>
  );
};

const ApplicationDetails = ({ data }) => {
  // fetch all the non duplicate application names
  const applicationsSet = new Set();
  Object.entries(data).forEach(([key, value]) => {
    const appName = value.Tags["app-name"];
    if (appName) {
      applicationsSet.add(appName);
    }
  });

  const applications = Array.from(applicationsSet);
  const [application, setApplication] = useState("");

  // form chart data state
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const _data = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value.Tags["app-name"] == application) {
        const date = value.Date.split("/");

        _data.push({
          date: `${date[2]}/${date[1]}/${date[0]}`,
          Cost: value.Cost,
          "Consumed Quantity": value.ConsumedQuantity,
        });
      }
    });

    _data.sort((a, b) => new Date(a.date) - new Date(b.date));
    setChartData(_data);
  }, [application]);

  return (
    <Card className="mt-8">
      <Title>Applications</Title>
      <Text>Access detailed information about each of the applications</Text>
      <SearchSelect
        id="application"
        name="application"
        value={application}
        onValueChange={setApplication}
        className="mt-2"
      >
        {applications.map((app) => (
          <SearchSelectItem key={app} value={app}>
            {app}
          </SearchSelectItem>
        ))}
      </SearchSelect>
      <LineChart
        data={chartData}
        index="date"
        categories={["Cost", "Consumed Quantity"]}
        valueFormatter={(number) =>
          Intl.NumberFormat("us").format(number).toString()
        }
        className="mt-2"
      />
    </Card>
  );
};

const Applications = () => {
  const { data, isLoading } = useRawData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        <CostsCard data={data} />
        <ConsumedCard data={data} />
      </Grid>
      <ApplicationDetails data={data} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Applications), {
  ssr: false,
});
