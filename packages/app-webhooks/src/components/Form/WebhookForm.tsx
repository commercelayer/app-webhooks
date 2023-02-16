import {
  useCoreSdkProvider,
  A,
  Spacer,
  Button,
  InputFeedback
} from '@commercelayer/core-app-elements'
import {
  Input,
  Form as FormProvider
} from '@commercelayer/app-elements-hook-form'
import { Webhook } from '@commercelayer/sdk'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import zod from 'zod'

import { ApiError } from 'App'
import { EventSelector } from '#components/Form/EventSelector'
import { appRoutes } from '#data/routes'
import { parseApiError } from '#utils/apiErrors'

const selectValueSchema = {
  label: zod.string().min(1),
  value: zod.string().min(1)
}

const webhookFormSchema = zod
  .object({
    name: zod.string().min(1, { message: `Name can't be blank` }),
    topic: zod.object(selectValueSchema, {
      required_error: `Topic can't be blank`,
      invalid_type_error: `Topic can't be blank`
    }),
    callback_url: zod
      .string()
      .min(1, { message: `Callback URL can't be blank` })
      .url({ message: 'Callback URL is invalid' }),
    include_resources: zod.string()
  })
  .required()

type WebhookFormValues = zod.infer<typeof webhookFormSchema>

interface Props {
  webhookData?: Webhook
}

const WebhookForm = ({ webhookData }: Props): JSX.Element | null => {
  const { sdkClient } = useCoreSdkProvider()
  const [apiError, setApiError] = useState<ApiError[] | undefined>(undefined)
  const [_location, setLocation] = useLocation()

  const formAction = webhookData !== undefined ? 'update' : 'create'

  /* eslint-disable @typescript-eslint/naming-convention */
  const topicValue =
    webhookData !== undefined
      ? {
          label: webhookData?.topic ?? '',
          value: webhookData?.topic ?? ''
        }
      : undefined

  const includeResourcesValue =
    webhookData?.include_resources != null
      ? webhookData?.include_resources.join(',')
      : ''

  const defaultValues = {
    name: webhookData?.name ?? '',
    topic: topicValue,
    callback_url: webhookData?.callback_url ?? '',
    include_resources: includeResourcesValue
  }

  const methods = useForm<WebhookFormValues>({
    defaultValues,
    resolver: zodResolver(webhookFormSchema)
  })

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
    [methods?.formState?.isSubmitted]
  )

  const submitWebhookTask = async (
    values: WebhookFormValues
  ): Promise<void> => {
    setApiError(undefined)

    try {
      const payload = {
        id: webhookData?.id as string,
        name: values.name,
        topic: values.topic?.value,
        callback_url: values.callback_url,
        include_resources: values.include_resources.split('.')
      }
      const sdkRequest = await sdkClient.webhooks[formAction](payload)
      methods.reset()
      setLocation(appRoutes.details.makePath(sdkRequest?.id))
    } catch (error) {
      setApiError(parseApiError(error))
    }
  }

  return (
    <FormProvider
      {...methods}
      onSubmit={(values) => {
        void submitWebhookTask(values)
      }}
    >
      <Spacer bottom='6'>
        <Input
          label='Name'
          name='name'
          hint={{
            text: 'Choose a meaningful name that helps you identify this webhook.'
          }}
        />
      </Spacer>

      <Spacer bottom='6'>
        <EventSelector
          name='topic'
          hintText={
            <>
              The resource/event that will trigger the webhook.{' '}
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
        <Input
          label='Callback URL'
          name='callback_url'
          hint={{ text: 'The URL invoked by the webhook.' }}
        />
      </Spacer>

      <Spacer bottom='6'>
        <Input
          label='Include'
          name='include_resources'
          hint={{
            text: 'Comma separated resource names that should be included in the request body.'
          }}
        />
      </Spacer>

      <Spacer bottom='14'>
        <Button variant='primary' type='submit'>
          {formAction === 'create' ? 'Create webhook' : 'Edit webhook'}
        </Button>
        {hasApiError ? (
          <div className='mt-2'>
            {apiError.map((error, idx) => (
              <InputFeedback key={idx} variant='danger' message={error.title} />
            ))}
          </div>
        ) : null}
      </Spacer>
    </FormProvider>
  )
}

export default WebhookForm
