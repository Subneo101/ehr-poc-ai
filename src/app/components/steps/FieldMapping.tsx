
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Search, Plus, Filter, Sparkles, CircleCheck } from 'lucide-react';
import { DataField } from '../DataField';
import { Badge } from '../ui/badge';
import { useWorkflow } from '../WorkflowContext';
import { Progress } from '../ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface FieldMappingProps {
  onNext: () => void;
  onBack: () => void;
}

export function FieldMapping({ onNext, onBack }: FieldMappingProps) {
  const { activeAction, setActiveAction } = useWorkflow();
  const [mappedFields, setMappedFields] = useState<Record<string, string>>({
    'Patient ID': 'Patient Number',
    'First Name': 'First Name',
    'Last Name': 'Last Name',
    'Date of Birth': 'DOB'
  });
  
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setActiveAction('mapFields');
  }, [setActiveAction]);

  const patientFields = [
    { id: 'patient-id', name: 'Patient ID', system: 'Acme Surgical Planner' },
    { id: 'first-name', name: 'First Name', system: 'Acme Surgical Planner' },
    { id: 'last-name', name: 'Last Name', system: 'Acme Surgical Planner' },
    { id: 'date-of-birth', name: 'Date of Birth', system: 'Acme Surgical Planner' },
    { id: 'gender', name: 'Gender', system: 'Acme Surgical Planner' },
    { id: 'phone', name: 'Phone Number', system: 'Acme Surgical Planner' },
    { id: 'email', name: 'Email Address', system: 'Acme Surgical Planner' },
    { id: 'address', name: 'Address', system: 'Acme Surgical Planner' },
    { id: 'insurance-id', name: 'Insurance ID', system: 'Acme Surgical Planner' },
    { id: 'insurance-provider', name: 'Insurance Provider', system: 'Acme Surgical Planner' }
  ];

  const examFields = [
    { id: 'exam-id', name: 'Exam ID', system: 'Acme Surgical Planner' },
    { id: 'exam-date', name: 'Exam Date', system: 'Acme Surgical Planner' },
    { id: 'visual-acuity-od', name: 'Visual Acuity OD', system: 'Acme Surgical Planner' },
    { id: 'visual-acuity-os', name: 'Visual Acuity OS', system: 'Acme Surgical Planner' },
    { id: 'iop-od', name: 'IOP OD', system: 'Acme Surgical Planner' },
    { id: 'iop-os', name: 'IOP OS', system: 'Acme Surgical Planner' },
    { id: 'exam-notes', name: 'Exam Notes', system: 'Acme Surgical Planner' },
    { id: 'doctor-id', name: 'Doctor ID', system: 'Acme Surgical Planner' }
  ];

  const surgicalFields = [
    { id: 'surgery-id', name: 'Surgery ID', system: 'Acme Surgical Planner' },
    { id: 'surgery-date', name: 'Surgery Date', system: 'Acme Surgical Planner' },
    { id: 'surgery-type', name: 'Surgery Type', system: 'Acme Surgical Planner' },
    { id: 'pre-op-diagnosis', name: 'Pre-Op Diagnosis', system: 'Acme Surgical Planner' },
    { id: 'post-op-diagnosis', name: 'Post-Op Diagnosis', system: 'Acme Surgical Planner' },
    { id: 'surgery-notes', name: 'Surgery Notes', system: 'Acme Surgical Planner' },
    { id: 'surgeon-id', name: 'Surgeon ID', system: 'Acme Surgical Planner' },
    { id: 'anesthesia-type', name: 'Anesthesia Type', system: 'Acme Surgical Planner' },
    { id: 'iol-power', name: 'IOL Power', system: 'Acme Surgical Planner' },
    { id: 'iol-type', name: 'IOL Type', system: 'Acme Surgical Planner' }
  ];

  const eyeMDFields = [
    { value: 'patient-number', label: 'Patient Number', match: ['Patient ID', 'Patient Number'] },
    { value: 'first-name', label: 'First Name', match: ['First Name', 'Given Name'] },
    { value: 'last-name', label: 'Last Name', match: ['Last Name', 'Family Name', 'Surname'] },
    { value: 'dob', label: 'DOB', match: ['Date of Birth', 'Birth Date', 'DOB'] },
    { value: 'gender', label: 'Gender', match: ['Gender', 'Sex'] },
    { value: 'phone', label: 'Phone', match: ['Phone Number', 'Phone', 'Telephone', 'Cell'] },
    { value: 'email', label: 'Email', match: ['Email', 'Email Address', 'E-mail'] },
    { value: 'address-line-1', label: 'Address Line 1', match: ['Address', 'Street Address'] },
    { value: 'address-line-2', label: 'Address Line 2', match: [] },
    { value: 'city', label: 'City', match: ['City'] },
    { value: 'state', label: 'State', match: ['State', 'Province'] },
    { value: 'zip', label: 'ZIP', match: ['ZIP', 'Postal Code', 'Zip Code'] },
    { value: 'insurance-member-id', label: 'Insurance Member ID', match: ['Insurance ID', 'Member ID'] },
    { value: 'insurance-plan', label: 'Insurance Plan', match: ['Insurance Provider', 'Insurance Plan', 'Provider'] },
    { value: 'exam-id', label: 'Exam ID', match: ['Exam ID', 'Examination ID'] },
    { value: 'exam-datetime', label: 'Exam Date/Time', match: ['Exam Date', 'Examination Date'] },
    { value: 'va-od', label: 'VA OD', match: ['Visual Acuity OD', 'VA OD', 'OD VA'] },
    { value: 'va-os', label: 'VA OS', match: ['Visual Acuity OS', 'VA OS', 'OS VA'] },
    { value: 'iop-od', label: 'IOP OD', match: ['IOP OD', 'OD IOP'] },
    { value: 'iop-os', label: 'IOP OS', match: ['IOP OS', 'OS IOP'] },
    { value: 'exam-notes', label: 'Clinical Notes', match: ['Exam Notes', 'Clinical Notes'] },
    { value: 'provider-id', label: 'Provider ID', match: ['Doctor ID', 'Provider ID', 'Physician ID'] },
    { value: 'surgery-case-id', label: 'Surgery Case ID', match: ['Surgery ID', 'Case ID'] },
    { value: 'surgery-datetime', label: 'Surgery Date/Time', match: ['Surgery Date', 'Operation Date'] },
    { value: 'procedure-code', label: 'Procedure Code', match: ['Surgery Type', 'Procedure Type', 'CPT Code'] },
    { value: 'pre-op-dx', label: 'Pre-Op Diagnosis', match: ['Pre-Op Diagnosis', 'Preoperative Diagnosis'] },
    { value: 'post-op-dx', label: 'Post-Op Diagnosis', match: ['Post-Op Diagnosis', 'Postoperative Diagnosis'] },
    { value: 'surgical-notes', label: 'Surgical Notes', match: ['Surgery Notes', 'OR Notes'] },
    { value: 'surgeon-id', label: 'Surgeon ID', match: ['Surgeon ID'] },
    { value: 'anesthesia-code', label: 'Anesthesia Code', match: ['Anesthesia Type', 'Anesthesia Code'] },
    { value: 'iol-power', label: 'IOL Power', match: ['IOL Power'] },
    { value: 'iol-model', label: 'IOL Model', match: ['IOL Type', 'IOL Model'] }
  ];

  const handleMap = (sourceField: string, targetField: string) => {
    setMappedFields(prev => ({
      ...prev,
      [sourceField]: targetField
    }));
  };

  const handleUnmap = (sourceField: string) => {
    setMappedFields(prev => {
      const updated = { ...prev };
      delete updated[sourceField];
      return updated;
    });
  };

  const getMappedFieldsCount = (fields: typeof patientFields) => {
    return fields.filter(field => mappedFields[field.name]).length;
  };

  const getTotalFieldsCount = (fields: typeof patientFields) => {
    return fields.length;
  };
  
  const getProgressPercentage = (fields: typeof patientFields) => {
    const mappedCount = getMappedFieldsCount(fields);
    const totalCount = getTotalFieldsCount(fields);
    return (mappedCount / totalCount) * 100;
  };
  
  const handleAutoMap = (fields: typeof patientFields) => {
    const newMappings = { ...mappedFields };
    
    fields.forEach(field => {
      if (!newMappings[field.name]) {
        // Find best match in eyeMD fields
        const matchedField = eyeMDFields.find(eyeField => 
          eyeField.match.includes(field.name)
        );
        
        if (matchedField) {
          newMappings[field.name] = matchedField.label;
        }
      }
    });
    
    setMappedFields(newMappings);
  };

  // Add Surgery Type mapping
  useEffect(() => {
    if (!mappedFields['Surgery Type'] && activeAction === 'mapFields') {
      const handleAddSurgeryTypeMap = () => {
        setTimeout(() => {
          handleMap('Surgery Type', 'Procedure Code');
        }, 500);
      };
      handleAddSurgeryTypeMap();
    }
  }, [mappedFields, activeAction]);
  
  // Get suggested matches for a field
  const getSuggestedMatches = (fieldName: string) => {
    return eyeMDFields.filter(field => field.match.includes(fieldName)).map(f => f.label);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2>Field Mapping</h2>
        <p className="text-muted-foreground">Map fields between Acme Surgical Planner and eyeMD EHR</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Field Mapping Configuration</CardTitle>
              <CardDescription>
                Map data fields between systems to ensure proper data synchronization
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-2 py-1">
                {Object.keys(mappedFields).length} fields mapped
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search fields..." 
                  className="pl-9" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
              </div>
              <Button size="sm" variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className={`gap-1 ${activeAction === 'mapFields' && !mappedFields['Surgery Type'] ? 'pulse-highlight' : ''}`}
              >
                <Plus className="h-4 w-4" />
                Add Custom
              </Button>
            </div>

            <Tabs defaultValue="patient" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="patient" className="flex items-center justify-start px-4 text-left">
                  <span>Patient Demographics</span>
                  <Badge className="ml-2 bg-primary/10 text-primary">
                    {getMappedFieldsCount(patientFields)}/{getTotalFieldsCount(patientFields)}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="exam" className="flex items-center justify-start px-4 text-left">
                  <span>Exam Data</span>
                  <Badge className="ml-2 bg-primary/10 text-primary">
                    {getMappedFieldsCount(examFields)}/{getTotalFieldsCount(examFields)}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="surgical" className="flex items-center justify-start px-4 text-left">
                  <span>Surgical Data</span>
                  <Badge className="ml-2 bg-primary/10 text-primary">
                    {getMappedFieldsCount(surgicalFields)}/{getTotalFieldsCount(surgicalFields)}
                  </Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="patient" className="space-y-4 mt-6 mb-2">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-muted-foreground">
                      Mapping Progress ({Math.round(getProgressPercentage(patientFields))}%)
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 px-2"
                            onClick={() => handleAutoMap(patientFields)}
                          >
                            <Sparkles className="h-4 w-4 text-primary mr-1" />
                            <span className="text-xs">Auto-map with AI</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Use AI to automatically map similar fields</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Progress value={getProgressPercentage(patientFields)} className="h-1.5" />
                </div>
                
                {patientFields
                  .filter(field => field.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(field => (
                    <DataField
                      key={field.id}
                      sourceField={field.name}
                      sourceSystem={field.system}
                      targetOptions={eyeMDFields}
                      mapped={mappedFields[field.name]}
                      onMap={(targetField) => handleMap(field.name, targetField)}
                      onUnmap={() => handleUnmap(field.name)}
                      suggestedMatches={getSuggestedMatches(field.name)}
                    />
                ))}
              </TabsContent>
              
              <TabsContent value="exam" className="space-y-4 mt-6 mb-2">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-muted-foreground">
                      Mapping Progress ({Math.round(getProgressPercentage(examFields))}%)
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 px-2"
                            onClick={() => handleAutoMap(examFields)}
                          >
                            <Sparkles className="h-4 w-4 text-primary mr-1" />
                            <span className="text-xs">Auto-map with AI</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Use AI to automatically map similar fields</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Progress value={getProgressPercentage(examFields)} className="h-1.5" />
                </div>
                
                {examFields
                  .filter(field => field.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(field => (
                    <DataField
                      key={field.id}
                      sourceField={field.name}
                      sourceSystem={field.system}
                      targetOptions={eyeMDFields}
                      mapped={mappedFields[field.name]}
                      onMap={(targetField) => handleMap(field.name, targetField)}
                      onUnmap={() => handleUnmap(field.name)}
                      suggestedMatches={getSuggestedMatches(field.name)}
                    />
                ))}
              </TabsContent>
              
              <TabsContent value="surgical" className="space-y-4 mt-6 mb-2">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-muted-foreground">
                      Mapping Progress ({Math.round(getProgressPercentage(surgicalFields))}%)
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 px-2"
                            onClick={() => handleAutoMap(surgicalFields)}
                          >
                            <Sparkles className="h-4 w-4 text-primary mr-1" />
                            <span className="text-xs">Auto-map with AI</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Use AI to automatically map similar fields</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Progress value={getProgressPercentage(surgicalFields)} className="h-1.5" />
                </div>
                
                {surgicalFields
                  .filter(field => field.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(field => (
                    <DataField
                      key={field.id}
                      sourceField={field.name}
                      sourceSystem={field.system}
                      targetOptions={eyeMDFields}
                      mapped={mappedFields[field.name]}
                      onMap={(targetField) => handleMap(field.name, targetField)}
                      onUnmap={() => handleUnmap(field.name)}
                      pulseHighlight={field.name === 'Surgery Type' && !mappedFields['Surgery Type'] && activeAction === 'mapFields'}
                      suggestedMatches={getSuggestedMatches(field.name)}
                    />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button 
            onClick={onNext}
            className={activeAction === 'mapFields' && mappedFields['Surgery Type'] ? 'pulse-highlight' : ''}
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
