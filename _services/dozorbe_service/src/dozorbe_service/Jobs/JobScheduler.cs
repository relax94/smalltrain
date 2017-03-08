using dozorbe_service.Jobs.Services;
using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dozorbe_service.Jobs
{
    public class JobScheduler
    {
        public static void Start()
        {

            //ISchedulerFactory sf = new StdSchedulerFactory();
            //var scTask = sf.GetScheduler();
            //scTask.Wait();
            //IScheduler sched = scTask.Result;

            //IJobDetail job = JobBuilder.Create<DozorBeJob>().Build();

            //ITrigger trigger = TriggerBuilder.Create()
            //    .StartNow()
            //    .WithSimpleSchedule
            //      (s =>
            //         s.WithIntervalInSeconds(10)
            //        .RepeatForever()
            //      )
            //    .Build();

            //sched.ScheduleJob(job, trigger);
        }
    }
}
