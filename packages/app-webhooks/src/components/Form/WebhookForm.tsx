import { Webhook } from '@commercelayer/sdk'
import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { ApiError } from 'App'
import {
  useTokenProvider,
  A,
  Input,
  Label,
  Spacer,
  Button,
  Text
} from '@commercelayer/core-app-elements'

import { EventSelector } from '#components/Form/EventSelector'
import { RelationshipSelector } from '#components/Form/RelationshipSelector'
import { appRoutes } from '#data/routes'
import { parseApiError } from '#utils/apiErrors'

interface Props {
  webhookId?: string
  webhookData?: Webhook
}

const WebhookForm = ({ webhookId, webhookData }: Props): JSX.Element | null => {
  const { sdkClient } = useTokenProvider()
  const [apiError, setApiError] = useState<ApiError[] | undefined>(undefined)
  const [_location, setLocation] = useLocation()

  const [isLoading, setIsLoading] = useState(false)

  const formMode = webhookData !== undefined ? 'edit' : 'new'

  /* eslint-disable @typescript-eslint/naming-convention */
  const {
    name = '',
    topic = '',
    callback_url = '',
    include_resources = []
  } = webhookData !== undefined ? webhookData : {}

  const [formName, setFormName] = useState(name)
  const [formTopic, setFormTopic] = useState<string>(topic)
  const [formCallbackUrl, setFormCallbackUrl] = useState(callback_url)
  const [formIncludeResources, setFormIncludeResources] =
    useState<string[]>(include_resources)

  const hasApiError = apiError != null && apiError.length > 0

  if (sdkClient == null) {
    console.warn('Waiting for SDK client')
    return null
  }

  useEffect(
    function clearApiError() {
      if (hasApiError) {
        setApiError(undefined)
      }
    },
    [formName, formTopic, formCallbackUrl, formIncludeResources]
  )

  const submitWebhookTask = async (): Promise<void> => {
    setApiError(undefined)
    setIsLoading(true)

    try {
      const payload = {
        id: webhookId as string,
        name: formName,
        topic: formTopic,
        callback_url: formCallbackUrl,
        include_resources: formIncludeResources
      }
      if (formMode === 'new') {
        await sdkClient.webhooks.create(payload)
        setLocation(appRoutes.list.makePath())
      } else {
        await sdkClient.webhooks.update(payload)
        setLocation(appRoutes.details.makePath(webhookId as string))
      }
    } catch (error) {
      setApiError(parseApiError(error))
      setIsLoading(false)
    }
  }

  return (
    <>
      <Spacer bottom='6'>
        <Label className='mb-2'>Name</Label>
        <Input onChange={setFormName} value={formName} />
        <Text variant='info' size='small' className='font-medium'>
          Choose a meaningful name that helps you identify this webhook.
        </Text>
      </Spacer>

      <Spacer bottom='6'>
        <EventSelector
          onSelect={setFormTopic}
          selectedEvent={formTopic}
          helperText={
            <>
              The resource/event that will trigger the webhook.
              <A
                href='https://docs.commercelayer.io/core/real-time-webhooks#supported-events'
                target='blank'
              >
                Browse supported events
              </A>
              .
            </>
          }
        />
      </Spacer>

      <Spacer bottom='6'>
        <Label className='mb-2'>Callback URL</Label>
        <Input
          onChange={setFormCallbackUrl}
          className='mb-1'
          value={formCallbackUrl}
        />
        <Text variant='info' size='small' className='font-medium'>
          The URL invoked by the webhook.
        </Text>
      </Spacer>

      <Spacer bottom='6'>
        <RelationshipSelector
          onSelect={setFormIncludeResources}
          selectedRelationships={formIncludeResources}
        />
      </Spacer>

      <Spacer bottom='14'>
        <Button
          variant='primary'
          onClick={() => {
            void submitWebhookTask()
          }}
          disabled={isLoading}
        >
          {formMode === 'new' ? 'Create webhook' : 'Edit webhook'}
        </Button>
        {hasApiError ? (
          <div>
            {apiError.map((error, idx) => (
              <Text variant='danger' key={idx}>
                {error.title}
              </Text>
            ))}
          </div>
        ) : null}
      </Spacer>
    </>
  )
}

export default WebhookForm
