import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@renderer/components/ui/tabs"
import { FeedViewType } from "@renderer/lib/enum"

import { DayOf } from "./constants"
import { DailyReportContent, DailyReportTitle } from "./daily"
import { useParseDailyDate } from "./hooks"

const tabs = [DayOf.Today, DayOf.Yesterday]

export const FeedDailyModalContent = () => {
  const today = useParseDailyDate(DayOf.Today)
  const yesterday = useParseDailyDate(DayOf.Yesterday)

  return (
    <Tabs defaultValue={DayOf.Today as any} className="flex h-full flex-col">
      <TabsList className="w-full">
        {tabs.map((tab: any) => (
          <TabsTrigger key={tab} value={tab}>
            <DailyReportTitle {...(tab === DayOf.Today ? today : yesterday)} />
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="flex grow flex-col items-center overflow-auto">
        {tabs.map((tab: any) => (
          <TabsContent key={tab} value={tab}>
            <DailyReportContent
              viewportClassName="max-h-[100vh] h-auto"
              // TODO support other view types
              autoResize={false}
              view={FeedViewType.SocialMedia}
              {...(tab === DayOf.Today ? today : yesterday)}
            />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
