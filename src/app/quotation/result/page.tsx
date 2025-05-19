"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import QuotationForm from '../../../components/QuotationForm.js';
import SavingsOverTimeChart from '../../../components/SavingsOverTimeChart.js';
import EnvironmentalImpact from '../../../components/EnvironmentalImpact.js';
import BillReductionChart from '../../../components/BillReductionChart.js';
import PaybackTimeline from '../../../components/PaybackTimeline.js';
import SolarSystemSizing from '../../../components/SolarSystemSizing.js';
import InvestmentComparison from '../../../components/InvestmentComparison.js';
import SolarVsGridPrice from '../../../components/SolarVsGridPrice.js';
import AnimatedProgressCircles from '../../../components/AnimatedProgressCircles.js';
import InteractiveSliders from '../../../components/InteractiveSliders.js';
import PersonalizedRecommendations from '../../../components/PersonalizedRecommendations.js';
import TestimonialsTrustBadges from '../../../components/TestimonialsTrustBadges.js';
import StateBenchmark from '../../../components/StateBenchmark.js';
import FAQNextSteps from '../../../components/FAQNextSteps.js';
import { Box, Text, Center, VStack, Button, Card, Heading, Icon, SimpleGrid } from '@chakra-ui/react';
import Navbar from '../../../components/Navbar';
import { FaChevronDown, FaFileDownload } from 'react-icons/fa';
import { useRef } from 'react';
import ScrollInsightButtonWrapper from '../../../components/ScrollInsightButtonWrapper';

// Define a function to calculate quote locally since we can't import it properly
function calculateQuote(billAmount: number, overrideSystemSize: number | null = null, category: string = 'residential') {
  // For commercial pricing
  if (category === 'commercial') {
    // Constants
    const electricityRate = 6; // ₹/kWh
    const avgSunHours = 5;
    const spacePerKW = 60; // sq ft
    const roiPeriod = 48; // months
  
    // Commercial price points as provided
    const commercialPrices = [
      { size: 3, cost: 140000 },
      { size: 5, cost: 220000 },
      { size: 6, cost: 270000 },
      { size: 10, cost: 400000 }
    ];
  
    // 1. Estimate Energy Usage (kWh/month)
    const energyUsage = billAmount / electricityRate;
    // 2. System Size (kW)
    const dailyUsage = energyUsage / 30;
    let systemSize = dailyUsage / avgSunHours;
    if (overrideSystemSize !== null) {
      systemSize = overrideSystemSize;
    }
    
    // For commercial, we allow any system size but use interpolation for pricing
    // Round to nearest 0.1 kW for simplicity
    systemSize = Math.round(systemSize * 10) / 10;
    
    // 3. Space Required
    let spaceRequired = Math.ceil(systemSize * spacePerKW);
    
    // 4. Cost calculation based on commercial pricing with interpolation
    let baseCost;
    
    // If system size is smaller than smallest defined size
    if (systemSize <= commercialPrices[0].size) {
      const costPerKW = commercialPrices[0].cost / commercialPrices[0].size;
      baseCost = systemSize * costPerKW;
    } 
    // If system size is larger than largest defined size
    else if (systemSize >= commercialPrices[commercialPrices.length - 1].size) {
      const costPerKW = commercialPrices[commercialPrices.length - 1].cost / 
                      commercialPrices[commercialPrices.length - 1].size;
      baseCost = systemSize * costPerKW;
    } 
    // Interpolation between two defined points
    else {
      // Find the two price points to interpolate between
      let lowerPoint = commercialPrices[0];
      let upperPoint = commercialPrices[1];
      
      for (let i = 0; i < commercialPrices.length - 1; i++) {
        if (systemSize >= commercialPrices[i].size && systemSize <= commercialPrices[i + 1].size) {
          lowerPoint = commercialPrices[i];
          upperPoint = commercialPrices[i + 1];
          break;
        }
      }
      
      // Linear interpolation formula: y = y1 + (x - x1) * ((y2 - y1) / (x2 - x1))
      baseCost = lowerPoint.cost + 
                (systemSize - lowerPoint.size) * 
                ((upperPoint.cost - lowerPoint.cost) / (upperPoint.size - lowerPoint.size));
    }
    
    // No separate subsidy for commercial
    const subsidy = 0;
    const finalCost = baseCost;
  
    // 5. ROI per Month
    const monthlySavings = billAmount;
    const breakEvenMonths = Math.ceil(finalCost / monthlySavings);
    const roiPerMonth = finalCost / roiPeriod;
    // 6. Parking spaces
    const parkingSpaces = Math.max(1, Math.round(spaceRequired / 80));
  
    // Output formatting
    return {
      systemSize: Number(systemSize.toFixed(1)),
      spaceRequired,
      estimatedCost: Math.round(finalCost),
      monthlySavings: Number(monthlySavings.toFixed(2)),
      breakEvenMonths,
      roiPerMonth: Number(roiPerMonth.toFixed(2)),
      baseCost: Math.round(baseCost),
      subsidy: Math.round(subsidy),
      parkingSpaces,
    };
  }
  // For residential pricing (existing logic)
  else {
    // Constants
    const electricityRate = 6; // ₹/kWh
    const avgSunHours = 5;
    const spacePerKW = 60; // sq ft
    const roiPeriod = 48; // months
  
    // 1. Estimate Energy Usage (kWh/month)
    const energyUsage = billAmount / electricityRate;
    // 2. System Size (kW)
    const dailyUsage = energyUsage / 30;
    let systemSize = dailyUsage / avgSunHours;
    if (overrideSystemSize !== null) {
      systemSize = overrideSystemSize;
    }
    
    // Round system size to nearest 1.1kW increment based on company policy
    const incrementSize = 1.1;
    const roundedSystemSize = Math.ceil(systemSize / incrementSize) * incrementSize;
    systemSize = roundedSystemSize;
    
    // 3. Space Required
    let spaceRequired = Math.ceil(systemSize * spacePerKW);
    
    // 4. Cost calculation based on company policy
    // For 1.1kW = ₹75,000, 2.2kW = ₹150,000, 3.3kW = ₹225,000, etc.
    const costPerIncrement = 75000;
    const numberOfIncrements = systemSize / incrementSize;
    const baseCost = numberOfIncrements * costPerIncrement;
    
    // No separate subsidy calculation needed as prices are all-inclusive
    const subsidy = 0;
    const finalCost = baseCost;
    
    // 5. ROI per Month
    const monthlySavings = billAmount;
    const breakEvenMonths = Math.ceil(finalCost / monthlySavings);
    const roiPerMonth = finalCost / roiPeriod;
    // 6. Parking spaces
    const parkingSpaces = Math.max(1, Math.round(spaceRequired / 80));
  
    // Output formatting
    return {
      systemSize: Number(systemSize.toFixed(2)),
      spaceRequired,
      estimatedCost: finalCost,
      monthlySavings: Number(monthlySavings.toFixed(2)),
      breakEvenMonths,
      roiPerMonth: Number(roiPerMonth.toFixed(2)),
      baseCost: Math.round(baseCost),
      subsidy: Math.round(subsidy),
      parkingSpaces,
    };
  }
}

// Card style for all visualizations
const vizCardStyle = {
  p: { base: 2, sm: 3, md: 6 },
  bg: 'white',
  rounded: 'xl',
  boxShadow: 'lg',
  borderWidth: '1px',
  borderColor: 'gray.100',
  transition: 'all 0.2s',
  _hover: {
    boxShadow: '2xl',
    transform: 'translateY(-4px) scale(1.02)',
    borderColor: 'orange.200',
  },
  mb: { base: 6, md: 8 },
  minW: 0,
  overflowX: { base: 'auto', md: 'visible' },
};

export default function QuotationResultPage() {
  const params = useSearchParams();
  const router = useRouter();
  const billAmount = params.get('billAmount');
  const category = params.get('category');
  const firstVizRef = useRef<HTMLDivElement>(null);

  if (!billAmount || !category) {
    return (
      <Center minH="60vh">
        <Box p={8} bg="white" rounded="lg" boxShadow="md">
          <Text fontSize="lg" color="red.500" fontWeight="bold">
            Invalid input. Please go back and enter your details.
          </Text>
        </Box>
      </Center>
    );
  }

  // Calculate recommended system size for display
  const recommended = calculateQuote(parseFloat(billAmount), null, category);
  // We'll use the recommended system size as the initial value for the chart
  const systemSize = recommended.systemSize;
  const breakEvenMonths = recommended.breakEvenMonths;
  const estimatedCost = recommended.estimatedCost;
  const monthlySavings = recommended.monthlySavings;

  const handleSeeMore = () => {
    if (firstVizRef.current) {
      firstVizRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Check if Navbar component exists
  const hasNavbar = typeof Navbar !== 'undefined';

  return (
    <Box minH="100vh" bgGradient="linear(to-br, #f8fafc, #fff)">
      {/* Navbar or Back Button */}
      <Box p={4}>
        {hasNavbar && <Navbar />}
        {!hasNavbar && (
          <Button onClick={() => router.push('/quotation')} colorScheme="orange" variant="outline">
            ← Back to Calculator
          </Button>
        )}
      </Box>
      <Box w="90vw" mx="auto" pt={hasNavbar ? 8 : 0} pb={8}>
        {/* Recommended System Size */}
        <Box textAlign="center" mb={4}>
          <Text fontSize="md" color="gray.600">
            <b>Recommended System Size:</b> {recommended.systemSize} kW for your bill
          </Text>
        </Box>
        {/* Main Quotation Form */}
        {/* @ts-ignore - Ignoring type issues with QuotationForm for now */}
        <QuotationForm billAmount={parseFloat(billAmount)} category={category} />
        
        {/* Title for visualizations section */}
        <Box ref={firstVizRef} pt={8} mb={6} textAlign="center">
          <Heading as="h2" size="lg" color="gray.700">
            Solar System Insights & Analysis
          </Heading>
          <Text color="gray.500" mt={2}>
            Explore the benefits and details of your recommended solar system
          </Text>
        </Box>
        {/* Visualizations Grid - Single Column */}
        <SimpleGrid columns={1} spacing={6} alignItems="stretch" w="90vw" mx="auto">
          {/* 1. Your Solar Savings Journey */}
          <Box {...vizCardStyle}>
            <SavingsOverTimeChart
              billAmount={parseFloat(billAmount)}
              systemSize={systemSize}
              breakEvenMonths={breakEvenMonths}
              estimatedCost={estimatedCost}
            />
          </Box>
          
          {/* 2. Your Monthly Bill Reduction */}
          <Box {...vizCardStyle}>
            <BillReductionChart billAmount={parseFloat(billAmount)} />
          </Box>
          
          {/* 3. Your Solar Payback Timeline */}
          <Box {...vizCardStyle}>
            <PaybackTimeline breakEvenMonths={breakEvenMonths} />
          </Box>
          
          {/* 4. Your Solar System Size Visualization */}
          <Box {...vizCardStyle}>
            <SolarSystemSizing systemSize={systemSize} />
          </Box>
          
          {/* 5. Solar vs Grid Price Projection */}
          <Box {...vizCardStyle}>
            <SolarVsGridPrice billAmount={parseFloat(billAmount)} />
          </Box>
          
          {/* 6. Interactive System Simulator */}
          <Box {...vizCardStyle}>
            <InteractiveSliders 
              initialBillAmount={parseFloat(billAmount)} 
              initialSystemSize={systemSize}
              category={category}
            />
          </Box>
          
          {/* 7. Key Metrics At a Glance */}
          <Box {...vizCardStyle}>
            <AnimatedProgressCircles 
              systemSize={systemSize} 
              breakEvenMonths={breakEvenMonths} 
              estimatedCost={estimatedCost}
            />
          </Box>
          
          {/* 8. Environmental Impact */}
          <Box {...vizCardStyle}>
            <EnvironmentalImpact systemSize={systemSize} />
          </Box>
          
          {/* 9. Investment Comparison */}
          <Box {...vizCardStyle}>
            <InvestmentComparison estimatedCost={estimatedCost} />
          </Box>
          
          {/* Personalized Recommendations */}
          <Box>
            <PersonalizedRecommendations 
              systemSize={systemSize}
              billAmount={parseFloat(billAmount)}
              category={category}
            />
          </Box>
          
          {/* Testimonials & Trust Badges */}
          <Box>
            <TestimonialsTrustBadges />
          </Box>
          
          {/* FAQ & Next Steps */}
          <Box>
            <FAQNextSteps />
          </Box>
        </SimpleGrid>
      </Box>
      <ScrollInsightButtonWrapper />
    </Box>
  );
} 