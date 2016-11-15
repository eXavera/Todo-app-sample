namespace Todo.Model
{
    public sealed class TodoItem
    {
        public int Id { get; set; }

        public bool IsCompleted { get; set; }

        public string Text { get; set; }
    }
}