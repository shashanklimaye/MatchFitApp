import { View, Text, Button } from '../../../../components'
import { useAPI } from '../../../../hooks/api'
import { useAuth } from '../../../../hooks/auth'
import { StudioCallout, StudioCalloutApplication } from '../../../../schema';
import { useEffect, useState } from 'react';
import { getInstructorRequest, acceptInstructorRequest, denyInstructorRequest } from '../../../../services/callout';
import { FetchError } from '../../../../schema/responses';
import { HttpMethod } from '../../../../constants/enums';
import { useLocalSearchParams } from 'expo-router';

/* Accepting / denying requests. */

const acceptRequest = async (calloutID: number, userID: number, makeRequest: <T>(path: string, method: HttpMethod, body?: object) => Promise<{data: StudioCalloutApplication, error: FetchError}>) => {
  const { data, error } = await acceptInstructorRequest(calloutID, userID, makeRequest);
}

const denyRequest = async (calloutID: number, userID: number, makeRequest: <T>(path: string, method: HttpMethod, body?: object) => Promise<{data: StudioCalloutApplication, error: FetchError}>) => {
  const { data, error } = await denyInstructorRequest(calloutID, userID, makeRequest);
}

export default function RequestPromptPage() {

  /* Hooks. */

  const { id } = useLocalSearchParams<{ id: string }>();
  const { makeRequest } = useAPI();
  const { user } = useAuth();

  /* Callout ID. */

  const calloutID: number = Number(id);

  /* Page state. */

  const [request, setRequest] = useState<StudioCallout>();

  /* The below code should run once on request load, loading the request details from the API. */

  useEffect(() => {

    const fetchRequest = async () => {

      const { data, error } = await getInstructorRequest(calloutID, makeRequest);
    
      if(data) {
        setRequest(data);
      }
    }
    
    fetchRequest();
  }, []);

  /* Page. */

  return (
    <View style="justify-center items-center h-full">
      <Text>{request?.calloutDateTimes.toString()}</Text>
      <Text>{request?.note}</Text>
      <Text>{request?.studioLocationAddress}</Text>
      <Text>{request?.instructorType}</Text>
      <Button label="Accept" onPress={async () => await acceptRequest(calloutID, user.id, makeRequest)} />
      <Button label="Deny" onPress={async () => await denyRequest(calloutID, user.id, makeRequest)}/>
    </View>
  )
}
