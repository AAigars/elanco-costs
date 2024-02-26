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
  // combine data from all resources
  const costs = data.reduce((result, app) => {
    const name = app["ServiceName"];
    result[name] = (result[name] || 0) + parseFloat(app.Cost);
    return result;
  }, {});

  // map cost data into barlist format and sort by value
  const barData = Object.keys(costs).map((app) => ({
    name: app,
    value: costs[app],
  }));

  barData.sort((a, b) => b.value - a.value);

  // calculate total cost of resources
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
    const name = app["ServiceName"];
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

const ResourceDetails = ({ data }) => {
  // fetch all the non duplicate resources names
  const resourcesSet = new Set();
  Object.entries(data).forEach(([key, value]) => {
    const appName = value["ServiceName"];
    if (appName) {
      resourcesSet.add(appName);
    }
  });

  const resources = Array.from(resourcesSet);
  const [resource, setResource] = useState("");

  // form chart data state
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const _data = [];

    data.forEach((entry) => {
      if (entry.ServiceName !== resource) return;

      const existingEntry = _data.find((item) => entry.Date === item.date);
      if (existingEntry) {
        existingEntry.Cost += parseFloat(entry.Cost);
        existingEntry["Consumed Quantity"] += parseInt(entry.ConsumedQuantity);
      } else {
        _data.push({
          date: entry.Date,
          Cost: parseFloat(entry.Cost),
          "Consumed Quantity": parseInt(entry.ConsumedQuantity),
        });
      }
    });

    _data.sort((a, b) => new Date(a.date) - new Date(b.date));
    setChartData(_data);
  }, [resource]);

  return (
    <Card className="mt-8">
      <Title>Resources</Title>
      <Text>Access detailed information about each of the resources</Text>
      <SearchSelect
        id="resource"
        name="resource"
        value={resource}
        onValueChange={setResource}
        className="mt-2"
      >
        {resources.map((app) => (
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

const Resources = () => {
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
      <ResourceDetails data={data} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Resources), {
  ssr: false,
});
