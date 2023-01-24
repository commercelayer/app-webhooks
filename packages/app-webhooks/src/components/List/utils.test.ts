import { getUiStatus } from './utils'

// getUiStatus
describe('getUiStatus', () => {
  test('should return `danger` status for the `<StatusIcon>` component when job is `open`', () => {
    expect(getUiStatus('open')).toBe('danger')
  })

  test('should return `success` status for the `<StatusIcon>` component when job is `closed`', () => {
    expect(getUiStatus('closed')).toBe('success')
  })
})
