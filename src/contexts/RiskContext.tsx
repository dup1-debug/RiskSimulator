
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchAllRiskData, fetchRiskDataById } from '../api/riskService';
import { RiskData } from '../api/mockData';
import { useToast } from '@/components/ui/use-toast';

interface RiskContextType {
  riskData: RiskData[];
  selectedRiskId: string | null;
  selectedRisk: RiskData | null;
  loading: boolean;
  error: string | null;
  selectRisk: (id: string) => void;
}

const RiskContext = createContext<RiskContextType | undefined>(undefined);

export const RiskProvider = ({ children }: { children: ReactNode }) => {
  const [riskData, setRiskData] = useState<RiskData[]>([]);
  const [selectedRiskId, setSelectedRiskId] = useState<string | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<RiskData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch all risk data on component mount
  useEffect(() => {
    const loadRiskData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllRiskData();
        setRiskData(data);
        
        // Set default selected risk if none is selected
        if (!selectedRiskId && data.length > 0) {
          setSelectedRiskId(data[0].id);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load risk data. Please try again later.');
        toast({
          title: 'Error',
          description: 'Failed to load risk data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadRiskData();
  }, [toast]);

  // Fetch selected risk data when selectedRiskId changes
  useEffect(() => {
    const loadSelectedRisk = async () => {
      if (selectedRiskId) {
        try {
          setLoading(true);
          const data = await fetchRiskDataById(selectedRiskId);
          setSelectedRisk(data || null);
          setError(null);
        } catch (err) {
          setError('Failed to load selected risk data.');
          toast({
            title: 'Error',
            description: 'Failed to load selected risk details',
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      } else {
        setSelectedRisk(null);
      }
    };

    loadSelectedRisk();
  }, [selectedRiskId, toast]);

  const selectRisk = (id: string) => {
    setSelectedRiskId(id);
  };

  return (
    <RiskContext.Provider
      value={{
        riskData,
        selectedRiskId,
        selectedRisk,
        loading,
        error,
        selectRisk,
      }}
    >
      {children}
    </RiskContext.Provider>
  );
};

export const useRiskContext = () => {
  const context = useContext(RiskContext);
  if (context === undefined) {
    throw new Error('useRiskContext must be used within a RiskProvider');
  }
  return context;
};
