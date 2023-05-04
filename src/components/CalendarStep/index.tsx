import { useEffect, useState } from "react";
import { Calendar } from "../Calendar";
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles";
import dayjs from "dayjs";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";

interface Availability {
  possibleTimes: number[];
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<Availability | null>(null);

  const isDateSelected = !!selectedDate;

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
  const describedDate = selectedDate
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    api.get("/users/times").then((response) => {
      setAvailability(response.data);
    });
  }, [selectedDate]);

  async function handleCreateEventInCalendar() {
    await api
      .get("/users/schedule")
      .then((response) => {
        toast.success("O evento foi criado na sua agenda!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  disabled={!availability.possibleTimes.includes(hour)}
                  onClick={handleCreateEventInCalendar}
                >
                  {String(hour).padStart(2, "0")}:00h
                </TimePickerItem>
              );
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}
