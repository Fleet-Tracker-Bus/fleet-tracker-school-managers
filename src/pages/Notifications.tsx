import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/ui/datepicker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import '../App.css'

const Notifications = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationType, setNotificationType] = useState("");
    const [recipientGroup, setRecipientGroup] = useState("");
    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
    const [scheduledTime, setScheduledTime] = useState("");
    const [scheduledNotifications, setScheduledNotifications] = useState<{
        id: number;
        type: string;
        message: string;
        recipients: string;
        date: string | null;
        time: string | null;
    }[]>([]);

    const [data] = useState([
        { sender: "Mohammed (driver)", receiver: "Fettah (parent)", type: "Waiting", message: "I am waiting for the kid near the house", date: "2024-11-14" },
        { sender: "Amine (parent)", receiver: "Sarah (driver)", type: "Concern", message: "Please ensure the child has his bag", date: "2024-11-14" },
        { sender: "Ahmed (driver)", receiver: "Khadija (parent)", type: "Drop Off", message: "The child has been dropped off at home", date: "2024-11-13" },
        { sender: "Rania (parent)", receiver: "Youssef (driver)", type: "Delayed", message: "Please let me know when you arrive", date: "2024-11-13" },
        { sender: "Fatima (driver)", receiver: "Samir (parent)", type: "Waiting", message: "Waiting near the designated pickup point", date: "2024-11-12" },
        { sender: "Omar (driver)", receiver: "Zineb (parent)", type: "Issue", message: "The vehicle has a minor issue, resolving it shortly", date: "2024-11-11" },
        { sender: "Layla (driver)", receiver: "Hassan (parent)", type: "On Route", message: "Heading to the designated stop, ETA 5 minutes", date: "2024-11-10" },
        { sender: "Hassan (parent)", receiver: "Layla (driver)", type: "Urgent", message: "Please call me back!", date: "2024-11-10" }
    ]);
    const [filters, setFilters] = useState({ sender: "", receiver: "", date: "" });

    const notifications = [
        {
            id: 1,
            date: "2024-11-12",
            time: "14:30",
            message: "Le conducteur John Doe a terminé la maintenance du véhicule #123 dans les délais.",
            type: "maintenance",
            source: "Automatique",
            priority: "low"
        },
        {
            id: 2,
            date: "2024-11-11",
            time: "08:15",
            message: "Le ravitaillement en carburant du véhicule #456 par le conducteur Jane Smith a été enregistré.",
            type: "fuel management",
            source: "Automatique",
            priority: "medium"
        },
        {
            id: 3,
            date: "2024-11-10",
            time: "16:45",
            message: "Le conducteur Mark Lee a signalé un mauvais comportement de l'élève #789 sur l'itinéraire.",
            type: "behavior",
            source: "Conducteur",
            priority: "high"
        },
        {
            id: 4,
            date: "2024-11-09",
            time: "12:00",
            message: "Le véhicule #789 a dépassé la limite de vitesse.",
            type: "speeding",
            source: "Automatique",
            priority: "critical"
        },
        {
            id: 5,
            date: "2024-11-08",
            time: "07:00",
            message: "Le conducteur Sam Carter a été marqué comme absent.",
            type: "attendance",
            source: "Système",
            priority: "high"
        },
        {
            id: 6,
            date: "2024-11-07",
            time: "18:20",
            message: "Le conducteur Laura Wilson a complété l'itinéraire #102 avec succès.",
            type: "route completion",
            source: "Conducteur",
            priority: "low"
        }
    ];

    const notificationTypes = [
        { type: "Payment_reminder", message: "This is a friendly reminder to complete your payment." },
        { type: "Event_notification", message: "Don't miss our upcoming event! Details are as follows..." },
        { type: "Attendance_reminder", message: "Attendance reminder: Please mark your attendance." },
    ];

    const filteredNotifications = notifications.filter(notification => {
        const matchesSearch = notification.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = selectedDate
            ? notification.date === selectedDate.toISOString().split('T')[0]
            : true;
        return matchesSearch && matchesDate;
    });

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleTypeChange = (selectedType: string) => {
        setNotificationType(selectedType);
        const selectedNotification = notificationTypes.find((n) => n.type === selectedType);
        setNotificationMessage(selectedNotification?.message || "");
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredData = data.filter((item) => {
        return (
            (!filters.sender || item.sender.toLowerCase().includes(filters.sender.toLowerCase())) &&
            (!filters.receiver || item.receiver.toLowerCase().includes(filters.receiver.toLowerCase())) &&
            (!filters.date || item.date === filters.date)
        );
    });

    const handleSendNotification = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newNotification = {
            id: scheduledNotifications.length + 1,
            type: notificationType,
            message: notificationMessage,
            recipients: recipientGroup,
            date: isScheduled ? scheduledDate?.toISOString().split('T')[0] || null : null,
            time: isScheduled ? scheduledTime : null,
        };

        setScheduledNotifications((prev) => [...prev, newNotification]);

        console.log("Scheduled notification created:", newNotification);

        setNotificationMessage("");
        setNotificationType("");
        setRecipientGroup("");
        setIsScheduled(false);
        setScheduledDate(null);
        setScheduledTime("");
    };

    const handleEdit = (id: number) => {
        const notificationToEdit = scheduledNotifications.find((n) => n.id === id);
        if (notificationToEdit) {
            setNotificationType(notificationToEdit.type);
            setNotificationMessage(notificationToEdit.message);
            setRecipientGroup(notificationToEdit.recipients);
            setIsScheduled(!!notificationToEdit.date);
            setScheduledDate(notificationToEdit.date ? new Date(notificationToEdit.date) : null);
            setScheduledTime(notificationToEdit.time || "");

            setScheduledNotifications((prev) => prev.filter((n) => n.id !== id));
        }
    };

    const handleDelete = (id: number) => {
        setScheduledNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <Card className="w-full min-h-screen mx-auto bg-white dark:bg-[#2B2B2B] border-hidden rounded-none">
            <CardContent className="p-6">
                <Tabs defaultValue="foryou" className="w-full">
                    <TabsList className="w-full mb-6 bg-gray-200 dark:bg-[#3C3C3C] p-1 rounded-md">
                        <TabsTrigger
                            value="foryou"
                            className="flex-1 
                        data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-[#4C4C4C] 
                        text-black dark:text-white 
                        data-[state=active]:text-black dark:data-[state=active]:text-white"
                        >
                            Pour vous
                        </TabsTrigger>
                        <TabsTrigger
                            value="send"
                            className="flex-1 
                        data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-[#4C4C4C] 
                        text-black dark:text-white 
                        data-[state=active]:text-black dark:data-[state=active]:text-white"
                        >
                            Envoyer
                        </TabsTrigger>
                        <TabsTrigger
                            value="logs"
                            className="flex-1 
                        data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-[#4C4C4C] 
                        text-black dark:text-white 
                        data-[state=active]:text-black dark:data-[state=active]:text-white"
                        >
                            Logs
                        </TabsTrigger>
                    </TabsList>

                    {/* For You Tab */}
                    <TabsContent value="foryou" className="text-gray-300">
                        <div className="flex flex-col items-center md:flex-row gap-4 mb-4 w-full">
                            <Input
                                placeholder="Search notifications..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-gray-100 dark:bg-[#2B2B2B] 
                   w-full 
                   placeholder:text-gray-500 dark:placeholder:text-gray-300 
                   text-black dark:text-white 
                   p-2 rounded-md 
                   border border-gray-300 dark:border-gray-700"
                            />
                            <div className="w-full md:w-[280px]">
                                <DatePicker
                                    selected={selectedDate}
                                    onSelect={(date: Date | null) => setSelectedDate(date)}
                                    className="bg-red-500 dark:bg-[#3C3C3C] text-black dark:text-white p-2 rounded-md border border-gray-300 dark:border-gray-700"
                                />
                            </div>
                        </div>
                        <div className="py-4">
                            <h1 className="text-black dark:text-white">
                                {selectedDate ? formatDate(selectedDate) : formatDate(new Date())}
                            </h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            {filteredNotifications.map((notification: any) => (
                                <div key={notification.id} className="flex md:max-w-xl w-full flex-col gap-2 bg-gray-200 dark:bg-[#4C4C4C] p-4 rounded-lg text-black dark:text-white">
                                    <div className="flex justify-between">
                                        <h1 className={`font-bold ${notification.priority == 'low' ? 'text-yellow-500' : notification.priority == 'medium' ? 'text-purple-500' : notification.priority == 'high' ? 'text-orange-500' : 'text-red-500'}`}>{notification.type}</h1>
                                        <p className={`text-sm`}>{notification.time}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xs">{notification.message}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Send Tab */}
                    <TabsContent value="send" className="text-gray-300 ">
                        <h2 className="text-xl font-semibold mb-4 hidden">Envoyer des notifications</h2>
                        <form onSubmit={handleSendNotification} className="space-y-4">
                            <div>
                                <Label className="text-black dark:text-white" htmlFor="type">Type de notification</Label>
                                <Select onValueChange={handleTypeChange} required>
                                    <SelectTrigger className="bg-white dark:bg-[#2B2B2B] mt-2 w-full text-gray-500 dark:text-gray-300 placeholder:px-2 p-2 rounded-md border-gray-300">
                                        <SelectValue placeholder="Select notification type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#3C3C3C] text-white">
                                        {notificationTypes.map((type) => (
                                            <SelectItem key={type.type} value={type.type}>
                                                {type.type.replace("_", " ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="text-black dark:text-white" htmlFor="message">Message de notification</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Enter your notification message here..."
                                    value={notificationMessage}
                                    onChange={(e) => setNotificationMessage(e.target.value)}
                                    className="bg-white dark:bg-[#2B2B2B] w-full placeholder:text-gray-500 dark:placeholder:text-gray-300 placeholder:px-2 text-black dark:text-white p-2 rounded-md border-gray-300 mt-2 "
                                    required
                                />
                            </div>
                            <div>
                                <Label className="text-black dark:text-white" htmlFor="recipients">Destinataires</Label>
                                <Select onValueChange={setRecipientGroup} required>
                                    <SelectTrigger className="bg-white dark:bg-[#2B2B2B] w-full text-gray-500 dark:text-gray-300 placeholder:px-2 p-2 rounded-md border-gray-300 mt-2">
                                        <SelectValue placeholder="Select recipients" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#3C3C3C] text-white">
                                        <SelectItem value="drivers">Tous les chauffeurs</SelectItem>
                                        <SelectItem value="parents">Tous les parents</SelectItem>
                                        <SelectItem value="both">Les chauffeurs et les parents</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div
                                    className={`switch ${isScheduled ? 'checked' : ''}`}
                                    onClick={() => setIsScheduled(!isScheduled)}
                                >
                                    <div className="thumb"></div>
                                </div>
                                <Label className="text-white" htmlFor="schedule">Planifier une notification</Label>
                            </div>
                            {isScheduled && (
                                <div className="flex space-x-4 items-center">

                                    <div className="flex-1 flex flex-col w-full">
                                        <Label className="mb-2 text-black dark:text-gray-400" htmlFor="time">Temps</Label>
                                        <Input
                                            id="time"
                                            type="time"
                                            value={scheduledTime}
                                            onChange={(e) => setScheduledTime(e.target.value)}
                                            className="bg-transparent text-black dark:text-white w-full border border-black"
                                        />
                                    </div>

                                    <div className=" flex-1 flex flex-col w-full">
                                        <Label className="mb-2 text-black dark:text-gray-400" htmlFor="date">Date</Label>
                                        <DatePicker
                                            id="date"
                                            selected={scheduledDate}
                                            onSelect={setScheduledDate}
                                            className="bg-transparent text-white w-full"
                                        />

                                    </div>

                                </div>
                            )}
                            <Button type="submit" className="bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/50" >
                                {isScheduled ? "Schedule Notification" : "Send Notification"}
                            </Button>
                        </form>

                        <div className="w-full mt-10 flex flex-col gap-2">
                            <h2 className="font-semibold mb-4 text-black dark:text-gray-400">Notifications programmées</h2>
                            <div className="flex flex-col gap-4">
                                {scheduledNotifications.map((notification) => (
                                    <div key={notification.id} className="flex md:max-w-xl w-full flex-col gap-2 bg-gray-200 dark:bg-[#4C4C4C] p-4 rounded-lg">
                                        <div className="flex justify-between">
                                            <h1 className="font-bold text-black dark:text-white">{notification.type.replace("_", " ")}</h1>
                                            <p className="text-sm text-gray-500 dark:text-gray-300">{notification.time || "N/A"}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-xs text-gray-500 dark:text-gray-300">{notification.message}</h3>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <Button className="text-gray-500 dark:text-gray-300" variant={'outline'} onClick={() => handleEdit(notification.id)} >
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDelete(notification.id)} className="bg-red-500 text-white">
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </TabsContent>

                    {/* Logs Tab */}
                    <TabsContent value="logs" className="text-gray-600 dark:text-gray-300">
                        <h2 className="text-xl font-semibold mb-4">Notification entre utilisateurs</h2>
                        <div>
                            {/* Filter Inputs */}
                            <div className="mb-4 flex gap-4">
                                <input
                                    type="text"
                                    name="sender"
                                    placeholder="Filter by sender"
                                    className="bg-gray-200 dark:bg-[#3C3C3C] text-white p-2 rounded-md"
                                    value={filters.sender}
                                    onChange={handleFilterChange}
                                />
                                <input
                                    type="text"
                                    name="receiver"
                                    placeholder="Filter by receiver"
                                    className="bg-gray-200 dark:bg-[#3C3C3C] text-white p-2 rounded-md"
                                    value={filters.receiver}
                                    onChange={handleFilterChange}
                                />
                                <div className="w-full md:w-[280px]">
                                    <DatePicker
                                        selected={selectedDate}
                                        onSelect={(date: Date | null) => setSelectedDate(date)}
                                        className="bg-[#3C3C3C] text-white p-2 rounded-md "
                                    />
                                </div>
                            </div>

                            <div className="py-4">
                                <h1>{selectedDate ? formatDate(selectedDate) : formatDate(new Date())}</h1>
                            </div>

                            {/* Table */}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Expéditeur</TableHead>
                                        <TableHead>Récepteur</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Message</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{item.sender}</TableCell>
                                            <TableCell>{item.receiver}</TableCell>
                                            <TableCell>{item.type}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell className="text-right">{item.message}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* No Data Message */}
                            {filteredData.length === 0 && (
                                <p className="text-center text-gray-500 mt-4">Aucune notification trouvée.</p>
                            )}
                        </div>


                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default Notifications;
