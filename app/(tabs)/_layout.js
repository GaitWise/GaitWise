import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { height: 50 },
        tabBarItemStyle: { height: 70 },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="walking"
        options={{
          title: 'Walking',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="walking" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="project_select"
        options={{
          title: 'project_select',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
