import { ResponsiveSankey } from '@nivo/sankey';
import { useIsClient } from '../hooks/useIsClient';

const data = {
  nodes: [
    // Origins (Ports)
    { id: 'Tanjung Priok', nodeColor: '#6366F1' },
    { id: 'Tanjung Perak', nodeColor: '#818CF8' },
    { id: 'Belawan', nodeColor: '#A5B4FC' },
    { id: 'Makassar', nodeColor: '#C7D2FE' },
    
    // Commodities
    { id: 'Coal', nodeColor: '#F59E0B' },
    { id: 'Palm Oil', nodeColor: '#10B981' },
    { id: 'Containers', nodeColor: '#3B82F6' },
    { id: 'Steel', nodeColor: '#6B7280' },
    
    // Destinations / Types
    { id: 'Export', nodeColor: '#EC4899' },
    { id: 'Domestic', nodeColor: '#8B5CF6' },
    { id: 'Import', nodeColor: '#14B8A6' },
  ],
  links: [
    // Tanjung Priok Flows
    { source: 'Tanjung Priok', target: 'Containers', value: 150 },
    { source: 'Tanjung Priok', target: 'Steel', value: 40 },
    { source: 'Tanjung Priok', target: 'Palm Oil', value: 30 },
    
    // Tanjung Perak Flows
    { source: 'Tanjung Perak', target: 'Containers', value: 100 },
    { source: 'Tanjung Perak', target: 'Coal', value: 60 },
    { source: 'Tanjung Perak', target: 'Palm Oil', value: 50 },
    
    // Belawan Flows
    { source: 'Belawan', target: 'Palm Oil', value: 120 },
    { source: 'Belawan', target: 'Containers', value: 40 },
    
    // Makassar Flows
    { source: 'Makassar', target: 'Coal', value: 40 },
    { source: 'Makassar', target: 'Containers', value: 30 },
    
    // Commodity to Type Flows
    { source: 'Containers', target: 'Export', value: 120 },
    { source: 'Containers', target: 'Domestic', value: 140 },
    { source: 'Containers', target: 'Import', value: 60 },
    
    { source: 'Coal', target: 'Export', value: 80 },
    { source: 'Coal', target: 'Domestic', value: 20 },
    
    { source: 'Palm Oil', target: 'Export', value: 160 },
    { source: 'Palm Oil', target: 'Domestic', value: 40 },
    
    { source: 'Steel', target: 'Import', value: 30 },
    { source: 'Steel', target: 'Domestic', value: 10 },
  ],
};

const theme = {
  background: "#ffffff",
  text: {
    fontSize: 12,
    fill: "#333333",
    outlineWidth: 0,
    outlineColor: "transparent",
    fontFamily: "Inter, sans-serif",
  },
  axis: {
    domain: {
      line: {
        stroke: "#777777",
        strokeWidth: 1,
      },
    },
    legend: {
      text: {
        fontSize: 12,
        fill: "#333333",
        outlineWidth: 0,
        outlineColor: "transparent",
      },
    },
    ticks: {
      line: {
        stroke: "#777777",
        strokeWidth: 1,
      },
      text: {
        fontSize: 11,
        fill: "#333333",
        outlineWidth: 0,
        outlineColor: "transparent",
      },
    },
  },
  grid: {
    line: {
      stroke: "#dddddd",
      strokeWidth: 1,
    },
  },
  legends: {
    title: {
      text: {
        fontSize: 11,
        fill: "#333333",
        outlineWidth: 0,
        outlineColor: "transparent",
      },
    },
    text: {
      fontSize: 11,
      fill: "#333333",
      outlineWidth: 0,
      outlineColor: "transparent",
    },
    ticks: {
      line: {},
      text: {
        fontSize: 10,
        fill: "#333333",
        outlineWidth: 0,
        outlineColor: "transparent",
      },
    },
  },
  annotations: {
    text: {
      fontSize: 13,
      fill: "#333333",
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
    link: {
      stroke: "#000000",
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
    outline: {
      stroke: "#000000",
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
    symbol: {
      fill: "#000000",
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
  },
  tooltip: {
    container: {
      background: "#ffffff",
      fontSize: 12,
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
  },
};

export function SankeyCommodityChart() {
  const isClient = useIsClient();

  if (!isClient) {
    return <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-lg">Loading Chart...</div>;
  }

  return (
    <div className="h-[600px] w-full bg-white rounded-lg p-4">
      <ResponsiveSankey
        data={data}
        margin={{ top: 40, right: 260, bottom: 40, left: 130 }}
        align="justify"
        colors={(node) => node.nodeColor}
        nodeOpacity={1}
        nodeHoverOthersOpacity={0.35}
        nodeThickness={18}
        nodeSpacing={24}
        nodeBorderWidth={0}
        nodeBorderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.8
                ]
            ]
        }}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        linkContract={3}
        enableLinkGradient={true}
        labelPosition="outside"
        labelOrientation="horizontal"
        labelPadding={16}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1
                ]
            ]
        }}
        theme={theme}
        nodeTooltip={({ node }: { node: any }) => (
            <div className="bg-white p-2 shadow-md rounded border border-gray-100 text-xs">
                <strong>{node.label}</strong>
                <br />
                Value: {node.value}
            </div>
        )}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 220,
                itemWidth: 100,
                itemHeight: 14,
                itemDirection: 'right-to-left',
                itemsSpacing: 2,
                itemTextColor: '#999',
                symbolSize: 14,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
      />
    </div>
  );
}
