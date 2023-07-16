require 'json'

def use_flutter_module_rn! (options={})
  package = JSON.parse(File.read(File.join(__dir__, "../package.json")))
  packageName = package['name']
  prefix = options[:path] ||= "../node_modules/#{packageName}"

  pod 'Flutter', :podspec => "#{prefix}/build/ios/framework/Flutter.podspec"
  pod 'FlutterModuleFrameworks-Debug',
    :configuration => 'Debug',
    :podspec => "#{prefix}/ios-rn/Podspecs/FlutterModuleRn-Debug.podspec"
  pod 'FlutterModuleFrameworks-Release',
    :configuration => 'Release',
    :podspec => "#{prefix}/ios-rn/Podspecs/FlutterModuleRn-Release.podspec"
end

