import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/ui/Header';
import PanicModeButton from '../components/ui/PanicModeButton';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Mic, MicOff, Save, BookOpen, Heart, Frown, Meh, Smile } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { fetchJournalEntries, addJournalEntry } from '../slices/journalSlice';

const Journal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { entries, loading } = useSelector(state => state.journal);

  const [entryText, setEntryText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showInsights, setShowInsights] = useState(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (user) {
      dispatch(fetchJournalEntries(user.uid));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (transcript) {
      setEntryText(prev => prev + ' ' + transcript);
    }
  }, [transcript]);

  const handleSaveEntry = async () => {
    if (!entryText.trim() || !user) return;

    try {
      await dispatch(addJournalEntry({
        userId: user.uid,
        entryData: {
          content: entryText.trim(),
          type: 'text',
        }
      })).unwrap();

      setEntryText('');
      resetTranscript();
    } catch (error) {
      console.error('Failed to save journal entry:', error);
    }
  };

  const toggleRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setIsRecording(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      setIsRecording(true);
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <Smile className="h-5 w-5 text-green-500" />;
      case 'negative': return <Frown className="h-5 w-5 text-red-500" />;
      default: return <Meh className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PanicModeButton />

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">AI Journal</h1>
            <p className="mt-2 text-gray-600">
              Write or speak your thoughts. Our AI will analyze your entries for insights.
            </p>
          </div>

          {/* New Entry */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>New Journal Entry</CardTitle>
              <CardDescription>
                Share what's on your mind. Your privacy is protected.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <textarea
                  value={entryText}
                  onChange={(e) => setEntryText(e.target.value)}
                  placeholder="How are you feeling today? What's been on your mind?"
                  className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {browserSupportsSpeechRecognition && (
                  <Button
                    onClick={toggleRecording}
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    className="absolute bottom-2 right-2"
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                )}
              </div>

              {isRecording && (
                <div className="flex items-center space-x-2 text-sm text-red-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Listening... Speak your thoughts</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {entryText.length} characters
                </div>
                <Button onClick={handleSaveEntry} disabled={loading || !entryText.trim()}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Entry
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Previous Entries */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Journal Entries</h2>

            {entries.map((entry) => (
              <Card key={entry.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {new Date(entry.createdAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardTitle>
                      <CardDescription>
                        {new Date(entry.createdAt).toLocaleTimeString()}
                      </CardDescription>
                    </div>
                    {entry.insights && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowInsights(showInsights === entry.id ? null : entry.id)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        AI Insights
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 whitespace-pre-wrap">{entry.content}</p>

                  {showInsights === entry.id && entry.insights && (
                    <div className="border-t pt-4 space-y-3">
                      <h4 className="font-semibold text-gray-900">AI Analysis</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            {getSentimentIcon(entry.insights.sentiment)}
                            <span className="font-medium capitalize">
                              {entry.insights.sentiment} Sentiment
                            </span>
                          </div>
                          {entry.insights.emotions && entry.insights.emotions.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-gray-700">Emotions: </span>
                              <span className="text-sm text-gray-600">
                                {entry.insights.emotions.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>

                        <div>
                          {entry.insights.triggers && entry.insights.triggers.length > 0 && (
                            <div className="mb-2">
                              <span className="text-sm font-medium text-gray-700">Potential Triggers: </span>
                              <span className="text-sm text-gray-600">
                                {entry.insights.triggers.join(', ')}
                              </span>
                            </div>
                          )}
                          {entry.insights.positives && entry.insights.positives.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-gray-700">Positive Aspects: </span>
                              <span className="text-sm text-gray-600">
                                {entry.insights.positives.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {entry.insights.suggestions && (
                        <div className="bg-blue-50 p-3 rounded-md">
                          <span className="text-sm font-medium text-blue-800">Suggestions: </span>
                          <span className="text-sm text-blue-700">
                            {entry.insights.suggestions}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {entries.length === 0 && !loading && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No journal entries yet</h3>
                <p className="text-gray-500 mb-4">
                  Start writing your thoughts. Our AI will help you understand your patterns.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Journal;