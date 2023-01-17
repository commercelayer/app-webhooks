import { rest } from 'msw'

export const handlers = [
  rest.get('https://*.commercelayer.io/api/exports', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 'xYZkjABcde',
            type: 'exports',
            links: {
              self: 'https://yourdomain.commercelayer.io/api/exports/xYZkjABcde'
            },
            attributes: {
              resource_type: 'skus',
              format: 'json',
              status: 'in_progress',
              includes: ['prices.price_tiers'],
              filters: {
                code_eq: 'AAA'
              },
              dry_data: false,
              started_at: '2018-01-01T12:00:00.000Z',
              completed_at: '2018-01-01T12:00:00.000Z',
              interrupted_at: '2018-01-01T12:00:00.000Z',
              records_count: 300,
              attachment_url: 'http://cl_exports.s3.amazonaws.com/',
              created_at: '2018-01-01T12:00:00.000Z',
              updated_at: '2018-01-01T12:00:00.000Z',
              reference: 'ANY-EXTERNAL-REFEFERNCE',
              reference_origin: 'ANY-EXTERNAL-REFEFERNCE-ORIGIN',
              metadata: {
                foo: 'bar'
              }
            },
            relationships: {
              events: {
                links: {
                  self: 'https://yourdomain.commercelayer.io/api/exports/xYZkjABcde/relationships/events',
                  related:
                    'https://yourdomain.commercelayer.io/api/exports/xYZkjABcde/events'
                }
              }
            },
            meta: {
              mode: 'test'
            }
          }
        ],
        meta: {
          record_count: 140,
          page_count: 14
        },
        links: {
          first:
            'https://yourdomain.commercelayer.io/api/exports?page[number]=1&page[size]=10',
          next: 'https://yourdomain.commercelayer.io/api/exports?page[number]=2&page[size]=10',
          last: 'https://yourdomain.commercelayer.io/api/exports?page[number]=14&page[size]=10'
        }
      })
    )
  }),

  rest.get('https://*.commercelayer.io/api/exports/*', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          id: 'xYZkjABcde',
          type: 'exports',
          links: {
            self: 'https://yourdomain.commercelayer.io/api/exports/xYZkjABcde'
          },
          attributes: {
            resource_type: 'skus',
            format: 'json',
            status: 'in_progress',
            includes: ['prices.price_tiers'],
            filters: {
              code_eq: 'AAA'
            },
            dry_data: false,
            started_at: '2018-01-01T12:00:00.000Z',
            completed_at: '2018-01-01T12:00:00.000Z',
            interrupted_at: '2018-01-01T12:00:00.000Z',
            records_count: 300,
            attachment_url: 'http://cl_exports.s3.amazonaws.com/',
            created_at: '2018-01-01T12:00:00.000Z',
            updated_at: '2018-01-01T12:00:00.000Z',
            reference: 'ANY-EXTERNAL-REFEFERNCE',
            reference_origin: 'ANY-EXTERNAL-REFEFERNCE-ORIGIN',
            metadata: {
              foo: 'bar'
            }
          },
          relationships: {
            events: {
              links: {
                self: 'https://yourdomain.commercelayer.io/api/exports/xYZkjABcde/relationships/events',
                related:
                  'https://yourdomain.commercelayer.io/api/exports/xYZkjABcde/events'
              }
            }
          },
          meta: {
            mode: 'test'
          }
        }
      })
    )
  })
]
